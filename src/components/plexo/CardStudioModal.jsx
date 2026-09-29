import React, { useState, useRef } from 'react';
import { X, Upload, Download, Sparkles, Paintbrush, RotateCcw, RotateCw, Trash2, ArrowRight, Check, Palette, Plus, Minus, Move, Smartphone, CreditCard } from 'lucide-react';

// Authentic Apple / iOS Emoji mappings for consistent high-res rendering across all platforms (iOS, Android, Desktop)
const EMOJI_CODE_MAP = {
  '👑': '1f451',
  '😎': '1f60e',
  '🔥': '1f525',
  '⭐': '2b50',
  '⚡': '26a1',
  '🛸': '1f6f8',
  '🍕': '1f355',
  '💸': '1f4b8',
  '💎': '1f48e',
  '🚀': '1f680',
  '❤️': '2764-fe0f',
  '🎧': '1f3a7',
};

const getEmojiUrl = (emoji) => {
  const code = EMOJI_CODE_MAP[emoji];
  return code ? `/emojis/${code}.png` : null;
};

export function CardStudioModal({ isOpen, onClose, onOpenWaitlist }) {
  if (!isOpen) return null;

  // Customization states
  const [activeTab, setActiveTab] = useState('themes'); // 'themes' | 'upload' | 'paint' | 'name'
  const [posterPreview, setPosterPreview] = useState(null);
  const [cardName, setCardName] = useState('YOUR NAME');
  const [posterName, setPosterName] = useState('YOUR NAME');
  const [cardTheme, setCardTheme] = useState('obsidian');
  const [customFontColor, setCustomFontColor] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageScale, setImageScale] = useState(1.0);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 }); // offset in percent of card (-60% to +60%)
  const isDraggingImageRef = useRef(false);
  const imageDragStartRef = useRef({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    cardWidth: 1,
    cardHeight: 1,
    isPinching: false,
    startDist: 0,
    origScale: 1.0,
  });
  const [brushColor, setBrushColor] = useState('#FFE600');
  const [brushSize, setBrushSize] = useState(4);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadPosterSuccess, setDownloadPosterSuccess] = useState(false);

  // Drawing canvas refs & Card ref for drag calculations
  const cardRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const isDraggingStickerRef = useRef(false);
  const dragStartRef = useRef({ 
    startX: 0, 
    startY: 0, 
    origX: 0, 
    origY: 0, 
    cardWidth: 1, 
    cardHeight: 1, 
    id: null,
    isPinching: false,
    startAngle: 0,
    startDist: 0,
    origRot: 0,
    origScale: 1.0,
  });

  // Card themes configuration
  const themes = [
    { id: 'obsidian', name: 'Matte Obsidian', bg: 'bg-[#0E0E10]', border: 'border-neutral-700', textDefault: '#FFFFFF' },
    { id: 'sunset', name: 'Sunset Glow', bg: 'bg-gradient-to-tr from-[#6D28D9] via-[#DB2777] to-[#F59E0B]', border: 'border-white/30', textDefault: '#FFFFFF' },
    { id: 'yellow', name: 'Cyber Yellow', bg: 'bg-[#FFE600]', border: 'border-black', textDefault: '#000000' },
    { id: 'inferno', name: 'Hot Inferno', bg: 'bg-gradient-to-br from-[#7C2D12] via-[#EA580C] to-[#FBBF24]', border: 'border-orange-400/40', textDefault: '#FFFFFF' },
    { id: 'emerald', name: 'Matrix Emerald', bg: 'bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#34D399]', border: 'border-emerald-400/40', textDefault: '#FFFFFF' },
    { id: 'purple', name: 'Neon Purple', bg: 'bg-gradient-to-br from-[#2E1065] via-[#7C3AED] to-[#C084FC]', border: 'border-purple-400/40', textDefault: '#FFFFFF' },
  ];

  // Font color palette
  const fontColors = [
    { id: 'white', name: 'Pure White', value: '#FFFFFF' },
    { id: 'black', name: 'Pitch Black', value: '#000000' },
    { id: 'yellow', name: 'Cyber Yellow', value: '#FFE600' },
    { id: 'gold', name: 'Warm Gold', value: '#F59E0B' },
    { id: 'cyan', name: 'Sky Cyan', value: '#38BDF8' },
    { id: 'emerald', name: 'Neon Emerald', value: '#10B981' },
    { id: 'red', name: 'Hot Red', value: '#E52320' },
    { id: 'pink', name: 'Vibrant Pink', value: '#EC4899' },
  ];

  // Extended Sticker palette
  const availableStickers = ['👑', '😎', '🔥', '⭐', '⚡', '🛸', '🍕', '💸', '💎', '🚀', '❤️', '🎧'];

  const selectedTheme = themes.find((t) => t.id === cardTheme) || themes[0];
  const activeFontColor = customFontColor || selectedTheme.textDefault;
  const selectedSticker = stickers.find((s) => s.id === selectedStickerId);

  // Handle Photo Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setImagePos({ x: 0, y: 0 });
      setImageScale(1.0);
      setActiveTab('upload');
    };
    reader.readAsDataURL(file);
  };

  // Image Drag with Mouse / Pointer (framing photo on card)
  const handleImagePointerDown = (e) => {
    if (activeTab !== 'upload' || !uploadedImage) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const cardRect = cardEl.getBoundingClientRect();

    imageDragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: imagePos.x,
      origY: imagePos.y,
      cardWidth: cardRect.width,
      cardHeight: cardRect.height,
      isPinching: false,
      startDist: 0,
      origScale: imageScale,
    };
    isDraggingImageRef.current = true;

    const onPointerMove = (moveEvt) => {
      if (!isDraggingImageRef.current) return;
      const dx = moveEvt.clientX - imageDragStartRef.current.startX;
      const dy = moveEvt.clientY - imageDragStartRef.current.startY;
      const dxPercent = (dx / imageDragStartRef.current.cardWidth) * 100;
      const dyPercent = (dy / imageDragStartRef.current.cardHeight) * 100;

      const newX = Math.max(-60, Math.min(60, imageDragStartRef.current.origX + dxPercent));
      const newY = Math.max(-60, Math.min(60, imageDragStartRef.current.origY + dyPercent));

      setImagePos({ x: parseFloat(newX.toFixed(2)), y: parseFloat(newY.toFixed(2)) });
    };

    const onPointerUp = () => {
      isDraggingImageRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  // Image Drag & Pinch with Touch
  const handleImageTouchStart = (e) => {
    if (activeTab !== 'upload' || !uploadedImage) return;
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const cardRect = cardEl.getBoundingClientRect();

    if (e.touches.length === 1) {
      const t = e.touches[0];
      imageDragStartRef.current = {
        startX: t.clientX,
        startY: t.clientY,
        origX: imagePos.x,
        origY: imagePos.y,
        cardWidth: cardRect.width,
        cardHeight: cardRect.height,
        isPinching: false,
        startDist: 0,
        origScale: imageScale,
      };
    } else if (e.touches.length >= 2) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const startDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      imageDragStartRef.current = {
        ...imageDragStartRef.current,
        isPinching: true,
        startDist,
        origScale: imageScale,
      };
    }
    isDraggingImageRef.current = true;

    const onTouchMove = (moveEvt) => {
      if (!isDraggingImageRef.current) return;
      if (moveEvt.cancelable) moveEvt.preventDefault();

      if (moveEvt.touches.length >= 2) {
        // 2-Finger Pinch to Zoom
        const t0 = moveEvt.touches[0];
        const t1 = moveEvt.touches[1];
        const curDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (imageDragStartRef.current.startDist > 0) {
          const ratio = curDist / imageDragStartRef.current.startDist;
          const newScale = Math.max(1.0, Math.min(3.0, parseFloat((imageDragStartRef.current.origScale * ratio).toFixed(2))));
          setImageScale(newScale);
        }
      } else if (moveEvt.touches.length === 1 && !imageDragStartRef.current.isPinching) {
        // 1-Finger Drag to Reposition
        const t = moveEvt.touches[0];
        const dx = t.clientX - imageDragStartRef.current.startX;
        const dy = t.clientY - imageDragStartRef.current.startY;
        const dxPercent = (dx / imageDragStartRef.current.cardWidth) * 100;
        const dyPercent = (dy / imageDragStartRef.current.cardHeight) * 100;

        const newX = Math.max(-60, Math.min(60, imageDragStartRef.current.origX + dxPercent));
        const newY = Math.max(-60, Math.min(60, imageDragStartRef.current.origY + dyPercent));

        setImagePos({ x: parseFloat(newX.toFixed(2)), y: parseFloat(newY.toFixed(2)) });
      }
    };

    const onTouchEnd = (endEvt) => {
      if (endEvt.touches.length === 0) {
        isDraggingImageRef.current = false;
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchcancel', onTouchEnd);
      } else if (endEvt.touches.length === 1) {
        imageDragStartRef.current.isPinching = false;
        const t = endEvt.touches[0];
        imageDragStartRef.current.startX = t.clientX;
        imageDragStartRef.current.startY = t.clientY;
        imageDragStartRef.current.origX = imagePos.x;
        imageDragStartRef.current.origY = imagePos.y;
      }
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
  };

  // Canvas drawing handlers (Mouse & Touch)
  const getCanvasCoords = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    if (activeTab !== 'paint' || isDraggingStickerRef.current) return;
    isDrawingRef.current = true;
    lastPosRef.current = getCanvasCoords(e);
  };

  const draw = (e) => {
    if (!isDrawingRef.current || activeTab !== 'paint' || isDraggingStickerRef.current) return;
    e.preventDefault();
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pos = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPosRef.current = pos;
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  // Sticker Handlers: Add, Drag, Resize, Rotate, Delete
  const addSticker = (emoji) => {
    const newId = Date.now() + Math.random();
    const newSticker = {
      id: newId,
      emoji,
      x: 35 + Math.random() * 30, // center percent
      y: 35 + Math.random() * 30,
      scale: 1.0, // 0.6 to 2.8
      rotation: Math.round((Math.random() - 0.5) * 24),
    };
    setStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newId);
    setActiveTab('paint');
  };

  // Mouse / Pointer Drag Handler (for Desktop)
  const handleStickerPointerDown = (e, stickerId) => {
    e.stopPropagation();
    setSelectedStickerId(stickerId);

    const card = cardRef.current;
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const targetSticker = stickers.find((s) => s.id === stickerId);
    if (!targetSticker) return;

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: targetSticker.x,
      origY: targetSticker.y,
      cardWidth: cardRect.width,
      cardHeight: cardRect.height,
      id: stickerId,
      isPinching: false,
    };
    isDraggingStickerRef.current = true;

    const onPointerMove = (moveEvent) => {
      if (!isDraggingStickerRef.current) return;
      if (moveEvent.cancelable) moveEvent.preventDefault();

      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;
      const dxPercent = (dx / dragStartRef.current.cardWidth) * 100;
      const dyPercent = (dy / dragStartRef.current.cardHeight) * 100;

      const newX = Math.max(8, Math.min(92, dragStartRef.current.origX + dxPercent));
      const newY = Math.max(12, Math.min(88, dragStartRef.current.origY + dyPercent));

      setStickers((prev) =>
        prev.map((s) => (s.id === stickerId ? { ...s, x: newX, y: newY } : s))
      );
    };

    const onPointerUp = () => {
      isDraggingStickerRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Multi-Touch (2-Finger Rotate & Pinch-Scale, 1-Finger Drag) for Mobile
  const handleStickerTouchStart = (e, stickerId) => {
    e.stopPropagation();
    setSelectedStickerId(stickerId);

    const card = cardRef.current;
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const targetSticker = stickers.find((s) => s.id === stickerId);
    if (!targetSticker) return;

    if (e.touches.length === 1) {
      const t = e.touches[0];
      dragStartRef.current = {
        startX: t.clientX,
        startY: t.clientY,
        origX: targetSticker.x,
        origY: targetSticker.y,
        cardWidth: cardRect.width,
        cardHeight: cardRect.height,
        id: stickerId,
        isPinching: false,
        origRot: targetSticker.rotation || 0,
        origScale: targetSticker.scale || 1.0,
      };
    } else if (e.touches.length >= 2) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const startAngle = Math.atan2(t1.clientY - t0.clientY, t1.clientX - t0.clientX) * (180 / Math.PI);
      const startDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      dragStartRef.current = {
        ...dragStartRef.current,
        isPinching: true,
        startAngle,
        startDist,
        origRot: targetSticker.rotation || 0,
        origScale: targetSticker.scale || 1.0,
        id: stickerId,
      };
    }
    isDraggingStickerRef.current = true;

    const onTouchMove = (moveEvt) => {
      if (moveEvt.cancelable) moveEvt.preventDefault();

      if (moveEvt.touches.length >= 2) {
        // 2-Finger Twist to Rotate & Pinch to Scale
        const t0 = moveEvt.touches[0];
        const t1 = moveEvt.touches[1];
        const curAngle = Math.atan2(t1.clientY - t0.clientY, t1.clientX - t0.clientX) * (180 / Math.PI);
        const curDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);

        if (!dragStartRef.current.isPinching) {
          dragStartRef.current.isPinching = true;
          dragStartRef.current.startAngle = curAngle;
          dragStartRef.current.startDist = curDist;
          dragStartRef.current.origRot = targetSticker.rotation || 0;
          dragStartRef.current.origScale = targetSticker.scale || 1.0;
          return;
        }

        const dAngle = curAngle - dragStartRef.current.startAngle;
        let newRot = Math.round((dragStartRef.current.origRot + dAngle) % 360);
        newRot = ((newRot % 360) + 360) % 360;

        let newScale = dragStartRef.current.origScale;
        if (dragStartRef.current.startDist > 0) {
          const ratio = curDist / dragStartRef.current.startDist;
          newScale = Math.max(0.6, Math.min(2.8, parseFloat((dragStartRef.current.origScale * ratio).toFixed(2))));
        }

        setStickers((prev) =>
          prev.map((s) => (s.id === stickerId ? { ...s, rotation: newRot, scale: newScale } : s))
        );
      } else if (moveEvt.touches.length === 1 && !dragStartRef.current.isPinching) {
        // 1-Finger Position Drag
        const t = moveEvt.touches[0];
        const dx = t.clientX - dragStartRef.current.startX;
        const dy = t.clientY - dragStartRef.current.startY;
        const dxPercent = (dx / dragStartRef.current.cardWidth) * 100;
        const dyPercent = (dy / dragStartRef.current.cardHeight) * 100;

        const newX = Math.max(8, Math.min(92, dragStartRef.current.origX + dxPercent));
        const newY = Math.max(12, Math.min(88, dragStartRef.current.origY + dyPercent));

        setStickers((prev) =>
          prev.map((s) => (s.id === stickerId ? { ...s, x: newX, y: newY } : s))
        );
      }
    };

    const onTouchEnd = (endEvt) => {
      if (endEvt.touches.length === 0) {
        isDraggingStickerRef.current = false;
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('touchcancel', onTouchEnd);
      } else if (endEvt.touches.length === 1) {
        const t = endEvt.touches[0];
        const cur = stickers.find((s) => s.id === stickerId) || targetSticker;
        dragStartRef.current = {
          startX: t.clientX,
          startY: t.clientY,
          origX: cur.x,
          origY: cur.y,
          cardWidth: cardRect.width,
          cardHeight: cardRect.height,
          id: stickerId,
          isPinching: false,
          origRot: cur.rotation || 0,
          origScale: cur.scale || 1.0,
        };
      }
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
  };

  // Dedicated Rotate Knob Handle (Touch or Mouse Single-Finger Rotate)
  const handleRotateKnobDown = (e, stickerId) => {
    e.stopPropagation();
    if (e.cancelable) e.preventDefault();
    setSelectedStickerId(stickerId);

    const card = cardRef.current;
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const targetSticker = stickers.find((s) => s.id === stickerId);
    if (!targetSticker) return;

    // Center of the sticker in screen pixels
    const stickerCenterX = cardRect.left + (targetSticker.x / 100) * cardRect.width;
    const stickerCenterY = cardRect.top + (targetSticker.y / 100) * cardRect.height;

    const onRotateMove = (moveEvt) => {
      if (moveEvt.cancelable) moveEvt.preventDefault();
      const clientX = moveEvt.touches ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const clientY = moveEvt.touches ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const rad = Math.atan2(clientY - stickerCenterY, clientX - stickerCenterX);
      let deg = Math.round((rad * 180) / Math.PI) + 90; // +90 offset because knob is on top
      deg = ((deg % 360) + 360) % 360;

      setStickers((prev) =>
        prev.map((s) => (s.id === stickerId ? { ...s, rotation: deg } : s))
      );
    };

    const onRotateEnd = () => {
      window.removeEventListener('mousemove', onRotateMove);
      window.removeEventListener('mouseup', onRotateEnd);
      window.removeEventListener('touchmove', onRotateMove);
      window.removeEventListener('touchend', onRotateEnd);
      window.removeEventListener('touchcancel', onRotateEnd);
    };

    window.addEventListener('mousemove', onRotateMove);
    window.addEventListener('mouseup', onRotateEnd);
    window.addEventListener('touchmove', onRotateMove, { passive: false });
    window.addEventListener('touchend', onRotateEnd);
    window.addEventListener('touchcancel', onRotateEnd);
  };

  // Resize Selected Sticker
  const updateSelectedStickerScale = (deltaOrValue, isDelta = false) => {
    if (!selectedStickerId) return;
    setStickers((prev) =>
      prev.map((s) => {
        if (s.id !== selectedStickerId) return s;
        const curScale = s.scale || 1.0;
        const newScale = isDelta
          ? Math.max(0.6, Math.min(2.8, curScale + deltaOrValue))
          : Math.max(0.6, Math.min(2.8, deltaOrValue));
        return { ...s, scale: parseFloat(newScale.toFixed(2)) };
      })
    );
  };

  // Rotate Selected Sticker Button
  const rotateSelectedSticker = () => {
    if (!selectedStickerId) return;
    setStickers((prev) =>
      prev.map((s) => {
        if (s.id !== selectedStickerId) return s;
        return { ...s, rotation: ((s.rotation || 0) + 20) % 360 };
      })
    );
  };

  // Delete Selected Sticker
  const deleteSelectedSticker = () => {
    if (!selectedStickerId) return;
    setStickers((prev) => prev.filter((s) => s.id !== selectedStickerId));
    setSelectedStickerId(null);
  };

  const clearAllStickers = () => {
    setStickers([]);
    setSelectedStickerId(null);
  };

  // Core Graphic Renderer: Renders Card onto any 2D Context
  const renderCardGraphics = async (ctx, originX, originY, cardW, cardH, radius = 48) => {
    ctx.save();
    ctx.translate(originX, originY);
    const sX = cardW / 1200;
    const sY = cardH / 756;
    ctx.scale(sX, sY);

    // 1. Clip Card Shape
    ctx.beginPath();
    ctx.roundRect(0, 0, 1200, 756, radius / sX);
    ctx.clip();

    // Theme Background Fill
    if (cardTheme === 'obsidian') {
      ctx.fillStyle = '#0E0E10';
      ctx.fillRect(0, 0, 1200, 756);
    } else if (cardTheme === 'yellow') {
      ctx.fillStyle = '#FFE600';
      ctx.fillRect(0, 0, 1200, 756);
    } else if (cardTheme === 'sunset') {
      const grad = ctx.createLinearGradient(0, 756, 1200, 0);
      grad.addColorStop(0, '#6D28D9');
      grad.addColorStop(0.5, '#DB2777');
      grad.addColorStop(1, '#F59E0B');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 756);
    } else if (cardTheme === 'inferno') {
      const grad = ctx.createLinearGradient(0, 0, 1200, 756);
      grad.addColorStop(0, '#7C2D12');
      grad.addColorStop(0.5, '#EA580C');
      grad.addColorStop(1, '#FBBF24');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 756);
    } else if (cardTheme === 'emerald') {
      const grad = ctx.createLinearGradient(0, 0, 1200, 756);
      grad.addColorStop(0, '#064E3B');
      grad.addColorStop(0.5, '#059669');
      grad.addColorStop(1, '#34D399');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 756);
    } else {
      const grad = ctx.createLinearGradient(0, 0, 1200, 756);
      grad.addColorStop(0, '#2E1065');
      grad.addColorStop(0.5, '#7C3AED');
      grad.addColorStop(1, '#C084FC');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 756);
    }

    // 2. Draw Uploaded Photo (with pan & zoom framing)
    if (uploadedImage) {
      await new Promise((resolve) => {
        const img = new Image();
        if (typeof uploadedImage === 'string' && uploadedImage.startsWith('http')) {
          img.crossOrigin = 'anonymous';
        }
        img.onload = () => {
          const hRatio = 1200 / img.width;
          const vRatio = 756 / img.height;
          const baseRatio = Math.max(hRatio, vRatio);
          const totalScale = baseRatio * (imageScale || 1.0);
          const drawW = img.width * totalScale;
          const drawH = img.height * totalScale;
          const centerX = (1200 - drawW) / 2 + ((imagePos?.x || 0) / 100) * 1200;
          const centerY = (756 - drawH) / 2 + ((imagePos?.y || 0) / 100) * 756;
          ctx.drawImage(img, 0, 0, img.width, img.height, centerX, centerY, drawW, drawH);
          resolve();
        };
        img.onerror = resolve;
        img.src = uploadedImage;
      });
    }

    // Specular diagonal gloss shine
    const glossGrad = ctx.createLinearGradient(0, 0, 1200, 756);
    glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glossGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
    glossGrad.addColorStop(0.6, 'transparent');
    glossGrad.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
    ctx.fillStyle = glossGrad;
    ctx.fillRect(0, 0, 1200, 756);

    // 3. Draw In-Browser Paint / Graffiti Strokes
    if (drawCanvasRef.current) {
      ctx.drawImage(drawCanvasRef.current, 0, 0, 1200, 756);
    }

    // 4. Draw Draggable & Resized Stickers onto Canvas (Authentic Apple iOS Emojis)
    for (const st of stickers) {
      ctx.save();
      const x = (st.x / 100) * 1200;
      const y = (st.y / 100) * 756;
      ctx.translate(x, y);
      ctx.rotate(((st.rotation || 0) * Math.PI) / 180);
      const stScale = st.scale || 1.0;
      const size = Math.round(96 * stScale);

      const code = EMOJI_CODE_MAP[st.emoji];
      if (code) {
        await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, -size / 2, -size / 2, size, size);
            resolve();
          };
          img.onerror = () => {
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.font = `${Math.round(76 * stScale)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(st.emoji, 0, 0);
            resolve();
          };
          img.src = `/emojis/${code}.png`;
        });
      } else {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.font = `${Math.round(76 * stScale)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(st.emoji, 0, 0);
      }
      ctx.restore();
    }

    // 5. Draw Gold Metallic EMV Chip
    const chipX = 90;
    const chipY = 90;
    const chipW = 150;
    const chipH = 110;
    ctx.fillStyle = '#E5B83B';
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, 16);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#996515';
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chipX + 50, chipY);
    ctx.lineTo(chipX + 50, chipY + chipH);
    ctx.moveTo(chipX + 100, chipY);
    ctx.lineTo(chipX + 100, chipY + chipH);
    ctx.moveTo(chipX, chipY + 55);
    ctx.lineTo(chipX + chipW, chipY + 55);
    ctx.stroke();

    // 6. Draw Official Plexo Logo Sticker Image (No crossOrigin on local asset to prevent iOS taint)
    await new Promise((resolve) => {
      const logoImg = new Image();
      logoImg.onload = () => {
        const targetH = 210;
        const aspect = logoImg.width / logoImg.height;
        const targetW = targetH * aspect;
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;
        ctx.drawImage(logoImg, 1110 - targetW, 52, targetW, targetH);
        ctx.restore();
        resolve();
      };
      logoImg.onerror = resolve;
      logoImg.src = '/logo_intact.png';
    });

    // 7. Draw Contactless Waves
    ctx.strokeStyle = activeFontColor;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(280, 145, 20, -0.4 * Math.PI, 0.4 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(280, 145, 34, -0.4 * Math.PI, 0.4 * Math.PI);
    ctx.stroke();

    // 8. Draw Cardholder Label & Name (separated cleanly, no overlap)
    ctx.fillStyle = activeFontColor;
    ctx.font = '600 18px monospace';
    ctx.textAlign = 'left';
    ctx.globalAlpha = 0.7;
    ctx.fillText('CARDHOLDER', 90, 586);
    ctx.globalAlpha = 1.0;

    ctx.font = '800 42px monospace';
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 4;
    ctx.fillText((cardName || 'YOUR NAME').toUpperCase(), 90, 672);
    ctx.shadowBlur = 0;

    // 9. Draw DEBIT Wordmark
    ctx.fillStyle = activeFontColor;
    ctx.font = '900 36px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('DEBIT', 1110, 670);

    ctx.restore();
  };

    // Direct High-Resolution Image Downloader (restored classic direct download)
  const saveCanvasImage = async (canvas, fileName) => {
    try {
      const dataUrl = canvas.toDataURL('image/png');

      canvas.toBlob((blob) => {
        if (!blob) {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      }, 'image/png');
    } catch (e) {
      console.error('Download error:', e);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Download High-Resolution Composite PNG (Card Only)
  const handleDownloadCard = async () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 1200;
    exportCanvas.height = 756;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    await renderCardGraphics(ctx, 0, 0, 1200, 756, 48);

    const safeName = cardName.trim().toLowerCase().replace(/\s+/g, '-') || 'custom';
    await saveCanvasImage(exportCanvas, `plexo-card-${safeName}.png`);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  // Download Phone Showcase Poster (with tightly framed, balanced layout - zero dead space)
  const handleDownloadPoster = async () => {
    const posterCanvas = document.createElement('canvas');
    posterCanvas.width = 1080;
    posterCanvas.height = 1920;
    const ctx = posterCanvas.getContext('2d');
    if (!ctx) return;

    // 1. Poster Backdrop (#F6F4EE signature paper)
    ctx.fillStyle = '#F6F4EE';
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle paper grain dots
    ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
    for (let x = 20; x < 1080; x += 36) {
      for (let y = 20; y < 1920; y += 36) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Outer Poster Top Header Accent
    ctx.fillStyle = '#111111';
    ctx.font = '900 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('✦ PLEXO CARD STUDIO ✦', 540, 185);

    ctx.fillStyle = '#6B7280';
    ctx.font = '700 16px monospace';
    ctx.fillText('EXCLUSIVE ACCESS // DROP 001', 540, 225);

    // 2. Centered Phone Mockup Chassis (compact height 1220 eliminates all empty space at the bottom!)
    const phoneW = 952;
    const phoneH = 1220;
    const phoneX = (1080 - phoneW) / 2;
    const phoneY = (1920 - phoneH) / 2; // = 350
    const phoneR = 64;

    // Phone Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.22)';
    ctx.shadowBlur = 48;
    ctx.shadowOffsetY = 24;
    ctx.fillStyle = '#FAF8F5';
    ctx.beginPath();
    ctx.roundRect(phoneX, phoneY, phoneW, phoneH, phoneR);
    ctx.fill();
    ctx.restore();

    // Phone Border
    ctx.lineWidth = 5.5;
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(phoneX, phoneY, phoneW, phoneH, phoneR);
    ctx.stroke();

    // Dynamic Island / Top Speaker slot
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(540 - 75, phoneY + 28, 150, 24, 12);
    ctx.fill();

    // 3. Top Header Bar
    const badgeX = phoneX + 44;
    const badgeY = phoneY + 80;
    const badgeW = 390;
    const badgeH = 50;
    ctx.fillStyle = '#FFE600';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 12);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = '900 18px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ MADE BY PLEXO CARD STUDIO', badgeX + 16, badgeY + badgeH / 2);

    // Right: Plexo Logo Sticker (local relative path without crossOrigin to prevent iOS taint)
    await new Promise((resolve) => {
      const logoImg = new Image();
      logoImg.onload = () => {
        const logoH = 145;
        const aspect = logoImg.width / logoImg.height;
        const logoW = logoH * aspect;
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;
        ctx.drawImage(logoImg, phoneX + phoneW - 40 - logoW, phoneY + 38, logoW, logoH);
        ctx.restore();
        resolve();
      };
      logoImg.onerror = resolve;
      logoImg.src = '/logo_intact.png';
    });

    // 4. Center: Floating 3D Custom Debit Card
    const cardW = 864;
    const cardH = 545;
    const cardX = (1080 - cardW) / 2;
    const cardY = phoneY + 195;

    // Card floating shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
    ctx.shadowBlur = 44;
    ctx.shadowOffsetY = 22;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 36);
    ctx.fill();
    ctx.restore();

    // Draw the customized card
    await renderCardGraphics(ctx, cardX, cardY, cardW, cardH, 36);

    // 5. Bottom Section: "YOUR CUSTOMISED CARD", "EXCLUSIVE CARD" & "JOIN THE WAITLIST" directly under the card
    const infoY = cardY + cardH + 68;

    ctx.save();
    ctx.textAlign = 'center';

    // Headline
    ctx.fillStyle = '#000000';
    ctx.font = '900 52px sans-serif';
    ctx.fillText('YOUR CUSTOMISED CARD', 540, infoY);

    // Subtitle (Exclusive Card - customizable separate poster name!)
    ctx.font = '700 24px monospace';
    ctx.fillStyle = '#4B5563';
    ctx.fillText(
      `EXCLUSIVE CARD • ${(posterName || cardName || 'YOU').toUpperCase()}`,
      540,
      infoY + 48
    );

    // "JOIN THE WAITLIST" Button directly under the card name
    const btnY = infoY + 95;
    const btnW = phoneW - 120;
    const btnH = 84;
    const btnX = (1080 - btnW) / 2;

    // Button Shadow
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(btnX + 5, btnY + 5, btnW, btnH, 20);
    ctx.fill();

    // Button Fill & Border
    ctx.fillStyle = '#FFE600';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 20);
    ctx.fill();
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    // Button Text
    ctx.fillStyle = '#000000';
    ctx.font = '900 26px monospace';
    ctx.textBaseline = 'middle';
    ctx.fillText('JOIN THE WAITLIST AT PLEXO.APP', 540, btnY + btnH / 2);

    // Subtle Brand Tag below button
    ctx.font = '700 18px monospace';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('PLEXO CARD STUDIO • JOIN THE DROP', 540, btnY + btnH + 40);

    // iPhone Home Indicator Bar (Finishes the phone frame cleanly)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(540 - 100, phoneY + phoneH - 30, 200, 6, 3);
    ctx.fill();

    // Outer Poster Bottom Accent
    ctx.fillStyle = '#6B7280';
    ctx.font = '700 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DESIGNED FOR FREEDOM • PLEXO.APP', 540, 1750);

    ctx.restore();

        // Open Dedicated Story Poster Preview Modal
    const safeName = (posterName || cardName).trim().toLowerCase().replace(/\s+/g, '-') || 'custom';
    const fileName = `plexo-card-poster-${safeName}.png`;
    const dataUrl = posterCanvas.toDataURL('image/png');

    setPosterPreview({
      canvas: posterCanvas,
      url: dataUrl,
      fileName
    });
  };

  const handleDownloadFromPreview = async () => {
    if (!posterPreview) return;
    await saveCanvasImage(posterPreview.canvas, posterPreview.fileName);
    setDownloadPosterSuccess(true);
    setTimeout(() => setDownloadPosterSuccess(false), 3000);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        onClick={() => setSelectedStickerId(null)}
        className="relative w-full min-w-0 max-w-[95vw] sm:max-w-lg bg-[#FAF8F5] border-2 sm:border-3 border-black rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] my-auto overflow-hidden"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-black">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
            </div>
            <div className="min-w-0">
              <h3 className="font-plexo-headline text-base sm:text-xl font-black uppercase text-black tracking-tight leading-none truncate">
                PLEXO CARD STUDIO
              </h3>
              <p className="text-[10px] sm:text-[11px] font-medium text-neutral-600 truncate">Design your exclusive card &amp; download poster or card.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-neutral-100 border-2 border-black flex items-center justify-center text-black font-black transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer shrink-0 ml-2"
            aria-label="Close Studio"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Central Interactive Card Stage */}
        <div className="py-2.5 flex flex-col items-center justify-center select-none w-full">
            <div 
              ref={cardRef}
              className={`relative w-full max-w-[320px] sm:max-w-[340px] aspect-[1.586/1] rounded-[18px] sm:rounded-[20px] ${selectedTheme.bg} border-2 ${selectedTheme.border} shadow-[0_16px_36px_rgba(0,0,0,0.35)] p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden transition-all duration-200`}
            >
              {/* Uploaded Background Photo with Drag & Frame */}
              {uploadedImage && (
                <div 
                  className={`absolute inset-0 w-full h-full overflow-hidden z-0 select-none ${
                    activeTab === 'upload' ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-none'
                  }`}
                  onPointerDown={activeTab === 'upload' ? handleImagePointerDown : undefined}
                  onTouchStart={activeTab === 'upload' ? handleImageTouchStart : undefined}
                >
                  <img 
                    src={uploadedImage} 
                    alt="Custom Card Art" 
                    draggable={false}
                    style={{
                      transform: `translate(${imagePos.x}%, ${imagePos.y}%) scale(${imageScale})`,
                      transformOrigin: 'center center',
                    }}
                    className="w-full h-full object-cover select-none pointer-events-none transition-none will-change-transform"
                  />
                  {/* Visual Framing Hint when Upload tab is active */}
                  {activeTab === 'upload' && (
                    <div className="absolute inset-0 border-2 border-dashed border-[#FFE600]/80 rounded-[18px] sm:rounded-[20px] pointer-events-none z-10 flex items-center justify-center">
                      <div className="bg-black/60 backdrop-blur-xs text-[#FFE600] font-mono text-[9px] font-bold px-2.5 py-1 rounded-full pointer-events-none shadow-sm flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                        <Move className="w-3 h-3" />
                        <span>Drag photo to frame</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Specular Holographic Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none z-10" />

              {/* Paint / Drawing HTML5 Canvas Overlay */}
              <canvas
                ref={drawCanvasRef}
                width={1200}
                height={756}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className={`absolute inset-0 w-full h-full z-15 touch-none ${
                  activeTab === 'paint' ? 'cursor-crosshair' : 'pointer-events-none'
                }`}
              />

              {/* Draggable & Resizable Stickers Overlay */}
              {stickers.map((st) => {
                const isSelected = st.id === selectedStickerId;
                const scale = st.scale || 1.0;
                const basePx = 28; // base preview font size
                const currentPx = Math.round(basePx * scale);

                return (
                  <div
                    key={st.id}
                    onPointerDown={(e) => {
                      if (e.pointerType !== 'touch') {
                        handleStickerPointerDown(e, st.id);
                      }
                    }}
                    onTouchStart={(e) => handleStickerTouchStart(e, st.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStickerId(st.id);
                    }}
                    className={`absolute z-30 select-none cursor-grab active:cursor-grabbing transition-shadow group touch-none ${
                      isSelected ? 'ring-2 ring-[#FFE600] ring-offset-1 ring-offset-black/50 rounded-xl bg-white/10' : 'hover:scale-105'
                    }`}
                    style={{
                      left: `${st.x}%`,
                      top: `${st.y}%`,
                      transform: `translate(-50%, -50%) rotate(${st.rotation || 0}deg)`,
                      fontSize: `${currentPx}px`,
                      lineHeight: 1,
                      padding: '4px',
                    }}
                    title="Drag with 1 finger, twist 2 fingers to rotate & scale!"
                  >
                    {getEmojiUrl(st.emoji) ? (
                      <img
                        src={getEmojiUrl(st.emoji)}
                        alt={st.emoji}
                        style={{ width: `${currentPx}px`, height: `${currentPx}px` }}
                        className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none select-none"
                      />
                    ) : (
                      <span
                        style={{ fontSize: `${currentPx}px`, lineHeight: 1 }}
                        className="block drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none"
                      >
                        {st.emoji}
                      </span>
                    )}

                    {/* Active Controls Floating Over Sticker */}
                    {isSelected && (
                      <>
                        {/* 1. Dedicated Rotate Knob Handle (Drag with finger or mouse) */}
                        <button
                          type="button"
                          onPointerDown={(e) => handleRotateKnobDown(e, st.id)}
                          onTouchStart={(e) => handleRotateKnobDown(e, st.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white hover:bg-[#FFE600] active:bg-[#FFE600] border-2 border-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md z-40 text-black active:scale-110 transition-transform touch-none"
                          title="Rotate with finger or mouse"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-black pointer-events-none" />
                        </button>

                        {/* 2. Delete Badge */}
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSelectedSticker();
                          }}
                          className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-[9px] font-black border border-white shadow-md cursor-pointer z-40"
                          title="Delete sticker"
                        >
                          ✕
                        </button>

                        {/* 3. Quick Size [- | +] Badge */}
                        <div 
                          onPointerDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-black/90 text-white rounded-full px-1.5 py-0.5 border border-white/40 shadow-lg z-40 text-[9px] font-mono whitespace-nowrap"
                        >
                          <button
                            type="button"
                            onClick={() => updateSelectedStickerScale(-0.25, true)}
                            className="w-3.5 h-3.5 rounded-full hover:bg-neutral-700 flex items-center justify-center cursor-pointer font-black"
                            title="Shrink"
                          >
                            -
                          </button>
                          <span className="text-[8px] font-bold px-0.5 text-[#FFE600]">
                            {Math.round(scale * 100)}%
                          </span>
                          <button
                            type="button"
                            onClick={() => updateSelectedStickerScale(0.25, true)}
                            className="w-3.5 h-3.5 rounded-full hover:bg-neutral-700 flex items-center justify-center cursor-pointer font-black"
                            title="Enlarge"
                          >
                            +
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {/* Card Top: Metallic EMV Chip + Contactless + Official Plexo Logo Sticker */}
              <div className="flex justify-between items-start z-20 pointer-events-none">
                <div className="flex items-center gap-2">
                  {/* Metallic Gold Chip */}
                  <div className="w-9 h-6 sm:w-10 sm:h-7 rounded-md bg-[#E5B83B] border border-[#996515] relative p-0.5 sm:p-1 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div className="w-full h-px bg-[#996515]/60" />
                    <div className="flex justify-between w-full h-1">
                      <div className="w-1.5 h-full border-r border-[#996515]/60" />
                      <div className="w-1.5 h-full border-l border-[#996515]/60" />
                    </div>
                    <div className="w-full h-px bg-[#996515]/60" />
                  </div>

                  {/* Contactless Wave */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeFontColor} strokeWidth="2.5" className="opacity-85 transition-colors" aria-hidden="true">
                    <path d="M8.5 16.5C9.5 15.5 9.5 14 8.5 13" strokeLinecap="round" />
                    <path d="M12 19C14 17 14 13.5 12 11.5" strokeLinecap="round" />
                    <path d="M15.5 21.5C18.5 18.5 18.5 12 15.5 9" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Official Plexo Logo Sticker */}
                <div className="flex items-center">
                  <img 
                    src="/logo_intact.png" 
                    alt="PLEXO" 
                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)] pointer-events-none select-none transform -rotate-2"
                  />
                </div>
              </div>

              {/* Card Bottom: Custom Name + DEBIT Label (Cleanly separated) */}
              <div className="flex justify-between items-end z-20 pt-2 pointer-events-none">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <span 
                    className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest block opacity-70 transition-colors leading-none"
                    style={{ color: activeFontColor }}
                  >
                    CARDHOLDER
                  </span>
                  <span 
                    className="font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider drop-shadow-sm block transition-colors leading-none"
                    style={{ color: activeFontColor }}
                  >
                    {cardName || 'YOUR NAME'}
                  </span>
                </div>

                <span 
                  className="font-plexo-mono font-bold text-[9px] sm:text-[10px] tracking-widest uppercase opacity-90 transition-colors"
                  style={{ color: activeFontColor }}
                >
                  DEBIT
                </span>
              </div>
            </div>

            <span className="text-[10px] sm:text-[11px] font-bold text-neutral-500 mt-2 flex items-center gap-1 text-center px-2">
              {selectedSticker 
                ? `🎯 Drag ${selectedSticker.emoji} anywhere! Twist 2 fingers or drag top handle to rotate.`
                : activeTab === 'upload' && uploadedImage
                  ? '🖐️ Drag photo on the card to frame it. Pinch or use slider below to zoom.'
                  : activeTab === 'paint' 
                    ? '🎨 Stamp emojis & rotate with fingers, or paint graffiti!' 
                    : '✨ Preview updates live. Download poster or card below.'}
            </span>
          </div>

        {/* Customization Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-200/80 rounded-xl mb-2.5 border border-neutral-300">
          <button
            onClick={() => setActiveTab('themes')}
            className={`py-1.5 text-[10px] sm:text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'themes' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <span>Themes</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-1.5 text-[10px] sm:text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'upload' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Upload className="w-3 h-3 shrink-0" />
            <span>Upload</span>
          </button>
          <button
            onClick={() => setActiveTab('paint')}
            className={`py-1.5 text-[10px] sm:text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'paint' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Paintbrush className="w-3 h-3 shrink-0" />
            <span>Paint<span className="hidden sm:inline"> &amp; Emojis</span></span>
          </button>
          <button
            onClick={() => setActiveTab('name')}
            className={`py-1.5 text-[10px] sm:text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'name' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Palette className="w-3 h-3 shrink-0" />
            <span>Text<span className="hidden sm:inline"> &amp; Font</span></span>
          </button>
        </div>

        {/* Tab Controls Content Box */}
        <div className="min-h-[110px] w-full min-w-0 bg-white border-2 border-black rounded-2xl p-2.5 sm:p-3 shadow-[2px_2px_0px_#000000] mb-3 overflow-hidden">
          {/* 1. Themes Tab */}
          {activeTab === 'themes' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full min-w-0">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCardTheme(t.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 border-2 transition-transform cursor-pointer ${
                    cardTheme === t.id ? 'border-black scale-105 shadow-xs' : 'border-neutral-300'
                  } ${t.bg} ${t.id === 'yellow' ? 'text-black' : 'text-white'}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}

          {/* 2. Photo Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-1.5 px-3 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-black text-xs rounded-xl border-2 border-black flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadedImage ? 'Change Photo' : 'Choose Photo'}</span>
                </button>

                {uploadedImage && (
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setImagePos({ x: 0, y: 0 });
                      setImageScale(1.0);
                    }}
                    className="py-1.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl border border-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {/* Photo Framing Adjustments Bar (Zoom & Center) */}
              {uploadedImage && (
                <div className="flex items-center justify-between gap-2 p-1.5 bg-neutral-100 rounded-xl border border-neutral-300 animate-fadeIn">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-neutral-800">
                    <span className="text-neutral-500 uppercase">Zoom:</span>
                    <button
                      type="button"
                      onClick={() => setImageScale((s) => Math.max(1.0, parseFloat((s - 0.1).toFixed(2))))}
                      disabled={imageScale <= 1.0}
                      className="w-5 h-5 rounded bg-white border border-neutral-300 flex items-center justify-center hover:bg-neutral-200 disabled:opacity-40 cursor-pointer shadow-3xs"
                      title="Zoom Out"
                    >
                      <Minus className="w-3 h-3 text-black" />
                    </button>
                    <input
                      type="range"
                      min="1.0"
                      max="3.0"
                      step="0.05"
                      value={imageScale}
                      onChange={(e) => setImageScale(parseFloat(e.target.value))}
                      className="w-16 sm:w-24 h-1.5 accent-black cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setImageScale((s) => Math.min(3.0, parseFloat((s + 0.1).toFixed(2))))}
                      disabled={imageScale >= 3.0}
                      className="w-5 h-5 rounded bg-white border border-neutral-300 flex items-center justify-center hover:bg-neutral-200 disabled:opacity-40 cursor-pointer shadow-3xs"
                      title="Zoom In"
                    >
                      <Plus className="w-3 h-3 text-black" />
                    </button>
                    <span className="w-7 text-[10px] text-neutral-600 font-mono">
                      {imageScale.toFixed(1)}x
                    </span>
                  </div>

                  {/* Reset Framing Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setImagePos({ x: 0, y: 0 });
                      setImageScale(1.0);
                    }}
                    className="px-2 py-1 bg-white hover:bg-neutral-200 text-black border border-black rounded-lg text-[9px] font-mono font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    title="Center & reset photo"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. Paint & Emojis Tab */}
          {activeTab === 'paint' && (
            <div className="space-y-2">
              {/* Emojis Stamp Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono font-bold text-neutral-600 uppercase flex items-center gap-1">
                    <span>Stamp Emojis (Twist 2 fingers to rotate)</span>
                  </span>
                  {stickers.length > 0 && (
                    <button
                      onClick={clearAllStickers}
                      className="text-[9px] font-mono font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Clear All ({stickers.length})
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 w-full min-w-0">
                  {availableStickers.map((emoji) => {
                    const url = getEmojiUrl(emoji);
                    return (
                      <button
                        key={emoji}
                        onClick={() => addSticker(emoji)}
                        className="w-8 h-8 shrink-0 rounded-lg border border-neutral-300 hover:bg-[#FFE600] hover:border-black flex items-center justify-center cursor-pointer transition-all active:scale-90 p-1"
                        title={`Add ${emoji}`}
                      >
                        {url ? (
                          <img src={url} alt={emoji} className="w-5 h-5 object-contain pointer-events-none select-none" />
                        ) : (
                          <span className="text-base">{emoji}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Sticker Quick Adjust Bar */}
              {selectedSticker && (
                <div className="flex items-center justify-between gap-2 p-1.5 bg-neutral-100 rounded-xl border border-neutral-300">
                  <div className="flex items-center gap-1 text-[11px] font-bold font-mono">
                    {getEmojiUrl(selectedSticker.emoji) ? (
                      <img src={getEmojiUrl(selectedSticker.emoji)} alt={selectedSticker.emoji} className="w-5 h-5 object-contain select-none" />
                    ) : (
                      <span className="text-base">{selectedSticker.emoji}</span>
                    )}
                    <span className="text-neutral-500">Size:</span>
                    <input
                      type="range"
                      min="0.6"
                      max="2.6"
                      step="0.1"
                      value={selectedSticker.scale || 1.0}
                      onChange={(e) => updateSelectedStickerScale(parseFloat(e.target.value))}
                      className="w-16 h-1.5 accent-black cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={rotateSelectedSticker}
                      className="px-2 py-0.5 bg-white hover:bg-neutral-200 text-black border border-black rounded-lg text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                      title="Rotate 20°"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{selectedSticker.rotation || 0}°</span>
                    </button>

                    <button
                      onClick={deleteSelectedSticker}
                      className="p-1 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Brush Tools */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-200">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-mono font-bold text-neutral-600">BRUSH:</span>
                  {['#FFE600', '#FFFFFF', '#000000', '#E52320', '#10B981', '#38BDF8'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBrushColor(c)}
                      className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                        brushColor === c ? 'scale-125 border-black ring-1 ring-black' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setBrushSize((s) => Math.max(2, s - 2))}
                    className="w-5 h-5 rounded bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center font-mono font-black text-xs cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-[10px] font-mono font-bold w-4 text-center">{brushSize}</span>
                  <button
                    onClick={() => setBrushSize((s) => Math.min(12, s + 2))}
                    className="w-5 h-5 rounded bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center font-mono font-black text-xs cursor-pointer"
                  >
                    +
                  </button>

                  {hasDrawn && (
                    <button
                      onClick={clearCanvas}
                      className="ml-1 text-[9px] font-mono font-bold text-neutral-500 hover:text-red-600 cursor-pointer"
                    >
                      Reset Paint
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. Text & Font Tab */}
          {activeTab === 'name' && (
            <div className="space-y-2">
              {/* Dual Name Inputs: Card Name vs Poster Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* 1. Name on Card (Blue / Font color on physical card) */}
                <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-300">
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[9px] font-mono font-bold text-neutral-700 uppercase flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full border border-black/30" style={{ backgroundColor: activeFontColor }} />
                      <span>Card Name (Card)</span>
                    </label>
                    <span className="text-[8px] text-neutral-500 font-mono">
                      {cardName.length}/18
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={18}
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    placeholder="ENTER CARD NAME"
                    className="w-full font-mono font-bold text-[11px] bg-white border-2 border-black rounded-lg px-2 py-1 uppercase tracking-wider focus:outline-hidden"
                  />
                  <span className="text-[8px] font-mono text-neutral-500 mt-0.5 block">
                    Printed next to CARDHOLDER
                  </span>
                </div>

                {/* 2. Poster Subtitle Name (Yellow highlighted under card) */}
                <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-300">
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="text-[9px] font-mono font-bold text-neutral-700 uppercase flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#FFE600] border border-black" />
                      <span>Poster Subtitle (Yellow)</span>
                    </label>
                    <span className="text-[8px] text-neutral-500 font-mono">
                      {posterName.length}/22
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={22}
                    value={posterName}
                    onChange={(e) => setPosterName(e.target.value.toUpperCase())}
                    placeholder="ENTER POSTER NAME"
                    className="w-full font-mono font-bold text-[11px] bg-white border-2 border-black rounded-lg px-2 py-1 uppercase tracking-wider focus:outline-hidden"
                  />
                  <span className="text-[8px] font-mono text-neutral-500 mt-0.5 block truncate">
                    EXCLUSIVE CARD • {posterName || 'YOUR NAME'}
                  </span>
                </div>
              </div>

              {/* Font Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono font-bold text-neutral-600 uppercase flex items-center gap-1">
                    <Palette className="w-3 h-3 text-black" />
                    <span>Font Color</span>
                  </span>
                  {customFontColor && (
                    <button
                      onClick={() => setCustomFontColor(null)}
                      className="text-[9px] font-mono font-bold text-neutral-500 hover:text-black underline cursor-pointer"
                    >
                      Reset to Theme
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {fontColors.map((fc) => (
                    <button
                      key={fc.id}
                      onClick={() => setCustomFontColor(fc.value)}
                      title={fc.name}
                      className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer relative flex items-center justify-center ${
                        activeFontColor === fc.value ? 'border-black scale-125 shadow-xs ring-1 ring-black' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: fc.value }}
                    >
                      {activeFontColor === fc.value && (
                        <Check className={`w-2.5 h-2.5 ${fc.value === '#FFFFFF' || fc.value === '#FFE600' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                  
                  {/* Custom Hex Color Picker */}
                  <label 
                    className="w-5 h-5 rounded-full border-2 border-neutral-300 hover:border-black flex items-center justify-center cursor-pointer transition-transform relative overflow-hidden bg-gradient-to-tr from-rose-500 via-amber-400 to-indigo-500"
                    title="Custom Color"
                  >
                    <input 
                      type="color" 
                      value={activeFontColor} 
                      onChange={(e) => setCustomFontColor(e.target.value)}
                      className="opacity-0 absolute inset-0 cursor-pointer"
                    />
                    <Plus className="w-2.5 h-2.5 text-white drop-shadow-xs" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dual Download Buttons & Waitlist CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-0.5">
          {/* 1. Download Phone Story Poster (From User Sketch!) */}
          <button
            onClick={handleDownloadPoster}
            className="w-full sm:flex-1 py-2 px-3 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-black text-xs sm:text-sm rounded-xl border-2 border-black flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            title="Download full 9:16 phone poster"
          >
            {downloadPosterSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Poster Downloaded!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Download Poster</span>
              </>
            )}
          </button>

          {/* 2. Download Card Only PNG */}
          <button
            onClick={handleDownloadCard}
            className="w-full sm:flex-1 py-2 px-3 bg-white hover:bg-neutral-100 text-black font-black text-xs sm:text-sm rounded-xl border-2 border-black flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            title="Download clean transparent card cutout"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Card Saved!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download Card Only</span>
              </>
            )}
          </button>

          {/* 3. Lock In On Waitlist */}
          <button
            onClick={() => {
              onClose();
              if (onOpenWaitlist) onOpenWaitlist();
            }}
            className="w-full sm:flex-1 py-2 px-3 bg-black hover:bg-neutral-800 text-white font-black text-xs sm:text-sm rounded-xl border-2 border-black flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#FFE600] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Lock In On Waitlist</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFE600]" />
          </button>
        </div>


        {/* Dedicated Story Poster Preview Modal */}
        {posterPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-sm bg-[#FAF8F5] border-3 border-black rounded-3xl p-4 shadow-[6px_6px_0px_#000000] flex flex-col gap-3 my-auto max-h-[92vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000000]">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-plexo-headline font-black text-sm uppercase text-black">
                      POSTER PREVIEW
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500 font-bold block">
                      1080 &times; 1920 STORY POSTER
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPosterPreview(null)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border-2 border-black flex items-center justify-center text-black shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* High-res Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.15)] bg-neutral-900/5 flex items-center justify-center p-1">
                <img 
                  src={posterPreview.url} 
                  alt="Story Poster Preview" 
                  className="max-h-[48vh] sm:max-h-[52vh] w-auto object-contain rounded-xl select-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadFromPreview}
                  className="w-full py-2.5 px-3 bg-[#FFE600] hover:bg-[#FFDF00] text-black font-black text-xs uppercase rounded-xl border-2 border-black flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                >
                  {downloadPosterSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Poster Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Poster (PNG)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPosterPreview(null)}
                  className="w-full py-2 px-3 bg-white hover:bg-neutral-100 text-black font-bold text-xs uppercase rounded-xl border-2 border-black text-center transition-colors cursor-pointer"
                >
                  Back to Editor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}