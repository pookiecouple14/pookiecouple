// components/FormView.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "./axios";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import love from "../src/assets/love-message.png";
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Mail,
  Image as ImageIcon,
  Play,
  MessageCircle,
  Check,
  Gift,
  X,
  Loader2,
  Briefcase,
  CheckCheck,
  Award,
  Star,
  Camera,
  Music,
  Coffee,
  Umbrella,
  Moon,
  Sun,
  Smile,
  ThumbsUp,
  Zap,
  HeartHandshake,
  PartyPopper,
  Crown,
  Flower2,
  Lock,
  Unlock,
  Share2,
  Copy,
  Volume2,
  VolumeX,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import Confetti from "react-confetti";

// ---------- Enhanced Shadcn/ui style components ----------
const Button = React.forwardRef(
  (
    {
      children,
      variant = "default",
      size = "default",
      className = "",
      disabled = false,
      onClick,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      default:
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40",
      destructive:
        "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40",
      outline:
        "border-2 border-pink-200 bg-white/80 backdrop-blur-sm text-pink-600 hover:bg-pink-50 hover:border-pink-300",
      secondary:
        "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200",
      ghost: "text-pink-600 hover:bg-pink-50/80 backdrop-blur-sm",
      link: "text-pink-500 underline-offset-4 hover:underline hover:text-pink-600",
      career:
        "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/40",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 py-1.5 text-xs",
      lg: "h-14 px-8 py-3 text-base",
      xl: "h-16 px-10 py-4 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

const Alert = React.forwardRef(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const variants = {
      default:
        "bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200 text-pink-800",
      destructive:
        "bg-gradient-to-r from-red-50/80 to-rose-50/80 backdrop-blur-sm border border-red-200 text-red-800",
      success:
        "bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm border border-emerald-200 text-emerald-800",
      pro: "bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm border border-pink-200 text-pink-800 text-center flex justify-center items-center w-full mx-auto",
    };

    return (
      <div
        ref={ref}
        className={`relative rounded-xl p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5
    ref={ref}
    className={`font-semibold text-sm mb-1 ${className}`}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`text-sm ${className}`} {...props} />
  ),
);

AlertDescription.displayName = "AlertDescription";

// ---------- Enhanced Swipe‑to‑unlock career banner (fixed ref error) ----------
const SwipeToUnlockCareer = () => {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const thumbWidth = 56; // w-14 = 56px

  const dragX = useMotionValue(0);
  const labelOpacity = useTransform(
    dragX,
    [0, trackWidth - thumbWidth],
    [1, 0],
  );

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const threshold = trackWidth - thumbWidth - 20;
    if (info.point.x >= threshold) {
      window.open(
        "https://www.errormakesclever.com",
        "_self"
      );
    }
    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <motion.div
        className="relative md:mx-auto mx-4 my-4 rounded-2xl md:rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white p-4 md:p-5 shadow-2xl border border-pink-300/30 backdrop-blur-sm overflow-hidden max-w-5xl"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {i % 2 === 0 ? (
                <Heart className="w-2 h-2 text-white/40 fill-white/40" />
              ) : (
                <Star className="w-2 h-2 text-white/40 fill-white/40" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
              <motion.div
                className="bg-white/20 p-3 rounded-xl backdrop-blur-sm flex-shrink-0"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Briefcase className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
              </motion.div>

              <div className="flex-1">
                <motion.h4
                  className="font-bold text-white text-base md:text-xl mb-1 drop-shadow-md flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Found your soulmate?
                  <HeartHandshake className="w-5 h-5 inline-block text-pink-200" />
                </motion.h4>
                <motion.p
                  className="text-sm md:text-base text-pink-100 leading-tight drop-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Also, find the career you’ll love for life ✨
                </motion.p>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="flex items-center gap-3">
                <motion.div
                  className="hidden md:block text-xs text-pink-100"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-4 h-4" />
                </motion.div>

                <div
                  ref={trackRef}
                  className="relative w-full md:w-96 h-14 md:h-16 bg-white/25 backdrop-blur-md rounded-full p-1.5 flex items-center shadow-inner"
                >
                  <motion.span
                    style={{ opacity: labelOpacity }}
                    className="absolute left-1/2 -translate-x-1/2 text-xs md:text-sm font-medium text-white/90 pointer-events-none whitespace-nowrap"
                  >
                    {isDragging ? "Release to unlock →" : "Slide to unlock →"}
                  </motion.span>

                  <motion.div
                    drag="x"
                    dragConstraints={{
                      left: 0,
                      right: trackWidth - thumbWidth,
                    }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    style={{ x: dragX }}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isDragging ? (
                      <Unlock className="w-6 h-6 md:w-7 md:h-7 text-pink-600" />
                    ) : (
                      <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-pink-600" />
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="hidden md:block text-xs text-pink-100"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Unlock className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// ---------- Enhanced Info icon component ----------
const InfoIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

// ---------- MAIN FormView component ----------
const FormView = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealStage, setRevealStage] = useState("idle");
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const canvasRef = useRef(null);
  const scratchCanvasRef = useRef(null);
  const lastPointRef = useRef(null);
  const resultsRef = useRef(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    fetchForm();

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [formId]);

  useEffect(() => {
    if (showResults && results?.score >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showResults, results]);

  // Initialize scratch canvas
  useEffect(() => {
    if (scratchCanvasRef.current && !scratched && showResults) {
      const canvas = scratchCanvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(dpr, dpr);

      // Enhanced gradient background
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#ec4899");
      gradient.addColorStop(0.3, "#f472b6");
      gradient.addColorStop(0.6, "#fb7185");
      gradient.addColorStop(1, "#be185d");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Shimmer effect
      const shimmer = ctx.createLinearGradient(0, 0, rect.width, 0);
      shimmer.addColorStop(0, "rgba(255, 255, 255, 0)");
      shimmer.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
      shimmer.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw decorative hearts
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = 10 + Math.random() * 20;
        drawHeart(ctx, x, y, size);
      }

      // Stars/sparkles
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = 1.5 + Math.random() * 2.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shadow for text (NO blur filter here)
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;

      // Calculate responsive font sizes
      const baseFontSize = Math.min(rect.width, rect.height) * 0.05;
      const titleFontSize = Math.max(20, Math.min(32, baseFontSize));
      const subtitleFontSize = Math.max(14, Math.min(20, baseFontSize * 0.7));
      const smallFontSize = Math.max(12, Math.min(16, baseFontSize * 0.5));

      // Main text
      ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
      ctx.font = `bold ${titleFontSize}px "Poppins", Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(
        "💝 Scratch to Reveal 💝",
        rect.width / 2,
        rect.height / 2 - 40,
      );

      ctx.font = `${subtitleFontSize}px "Poppins", Arial, sans-serif`;
      ctx.fillText(
        "Your Special Surprise",
        rect.width / 2,
        rect.height / 2 + 10,
      );

      // Additional romantic text
      ctx.font = `italic ${smallFontSize}px "Poppins", Arial, sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillText(
        "A message from the heart",
        rect.width / 2,
        rect.height / 2 + 50,
      );

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
    }
  }, [showResults, scratched]);

  const drawHeart = (ctx, x, y, size) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(
      -size / 2,
      (topCurveHeight + size) / 2,
      0,
      (topCurveHeight + size) / 1.2,
      0,
      size,
    );
    ctx.bezierCurveTo(
      0,
      (topCurveHeight + size) / 1.2,
      size / 2,
      (topCurveHeight + size) / 2,
      size / 2,
      topCurveHeight,
    );
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.fill();
    ctx.restore();
  };

  const scratch = (e) => {
    if (!scratchCanvasRef.current || scratched) return;

    e.preventDefault();
    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    let x, y;
    if (e.type.includes("touch")) {
      const touch = e.touches[0] || e.changedTouches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 70; // Increased from 45 to 70

    if (lastPointRef.current && isScratching) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, 2 * Math.PI); // Increased from 25 to 40
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    if (Math.random() < 0.25) {
      checkScratchProgress();
    }
  };

  const checkScratchProgress = () => {
    if (!scratchCanvasRef.current) return;

    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let transparent = 0;
    const step = 4;

    for (let i = 3; i < pixels.length; i += 4 * step) {
      if (pixels[i] < 128) transparent++;
    }

    const progress = (transparent / (pixels.length / (4 * step))) * 100;
    setScratchProgress(progress);

    if (progress > 55 && !scratched) {
      setScratched(true);
      if (scratchCanvasRef.current) {
        scratchCanvasRef.current.style.transition =
          "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        scratchCanvasRef.current.style.opacity = "0";
      }
      setTimeout(() => setRevealStage("shaking"), 800);
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 150, 50, 200]);
      }
      setTimeout(() => setShowConfetti(true), 1200);
      setTimeout(() => setShowConfetti(false), 5000);
      setTimeout(() => setRevealStage("opening"), 2500);
      setTimeout(() => {
        setRevealStage("revealed");
        setShowReveal(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }, 3500);
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    lastPointRef.current = null;
    scratch(e);
  };

  const handleMouseMove = (e) => {
    if (isScratching) {
      scratch(e);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  const handleTouchStart = (e) => {
    setIsScratching(true);
    lastPointRef.current = null;
    scratch(e);
  };

  const handleTouchMove = (e) => {
    if (isScratching) {
      e.preventDefault();
      scratch(e);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  const fetchForm = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/form/${formId}`);

      if (!response.data || !response.data.fields) {
        throw new Error("Invalid form data structure");
      }

      setForm(response.data);

      const initialAnswers = {};
      if (Array.isArray(response.data.fields)) {
        response.data.fields.forEach((field) => {
          if (field && field.fieldId) {
            initialAnswers[field.fieldId] = "";
          }
        });
      }
      setAnswers(initialAnswers);
    } catch (err) {
      console.error("Error fetching form:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load quiz. Please check the URL and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (fieldId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < form.fields.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const startQuiz = () => {
    setHasStarted(true);
    setCurrentQuestion(0);
    const initialAnswers = {};
    form.fields.forEach((field) => {
      if (field && field.fieldId) {
        initialAnswers[field.fieldId] = "";
      }
    });
    setAnswers(initialAnswers);
  };

  const submitQuiz = async () => {
    try {
      setSubmitting(true);
      setError("");

      if (!form || !Array.isArray(form.fields) || form.fields.length === 0) {
        throw new Error("No questions available");
      }

      const formattedAnswers = Object.entries(answers)
        .filter(
          ([fieldId, value]) => fieldId && value !== undefined && value !== "",
        )
        .map(([fieldId, value]) => ({
          fieldId: fieldId.trim(),
          value: String(value).trim(),
        }));

      const response = await axios.post(
        `/form/${formId}/submit`,
        { answers: formattedAnswers },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
          timeout: 15000,
        },
      );

      const resultsData = {
        responseId: response.data.responseId,
        score: response.data.score || 0,
        totalQuestions: response.data.totalQuestions || form.fields.length,
        results: response.data.results || [],
        questions: form.fields.map((field) => ({
          ...field,
          userAnswer: answers[field.fieldId] || "",
          submitted: !!answers[field.fieldId],
        })),
      };

      setResults(resultsData);
      setShowResults(true);
      setShowReveal(false);
      setRevealStage("idle");
      setScratched(false);
      setScratchProgress(0);

      if (resultsData.score >= 70) {
        setShowConfetti(true);
      }

      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } catch (err) {
      console.error("Submission error:", err);
      let errorMessage = "Failed to submit quiz. Please try again.";

      if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
        errorMessage =
          "Request timed out. Please check your internet connection.";
      } else if (
        err.code === "ERR_NETWORK" ||
        err.message === "Network Error"
      ) {
        errorMessage = "Network error. Please check your connection.";
      } else if (err.response) {
        errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          errorMessage;
      }

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleReveal = () => {
    if (showReveal || revealStage === "revealed") {
      setRevealStage("idle");
      setShowReveal(false);
    } else {
      setRevealStage("shaking");
      setTimeout(() => setRevealStage("opening"), 3000);
      setTimeout(() => {
        setRevealStage("revealed");
        setShowReveal(true);
      }, 4000);
    }
  };

  const restartQuiz = () => {
    setHasStarted(true);
    setShowResults(false);
    setShowReveal(false);
    setRevealStage("idle");
    setShowConfetti(false);
    setResults(null);
    setScratched(false);
    setScratchProgress(0);
    setCurrentQuestion(0);
    setExpandedQuestion(null);
    const initialAnswers = {};
    form.fields.forEach((field) => {
      if (field && field.fieldId) {
        initialAnswers[field.fieldId] = "";
      }
    });
    setAnswers(initialAnswers);
  };

  const goToStart = () => {
    setHasStarted(false);
    setShowResults(false);
    setShowReveal(false);
    setRevealStage("idle");
    setShowConfetti(false);
    setResults(null);
    setScratched(false);
    setScratchProgress(0);
    setExpandedQuestion(null);
  };

  const handleCreateOwn = () => {
    navigate("/");
  };

  const shareResults = async () => {
    const shareData = {
      title: `${form.yourName} & ${form.yourSpouseName} Compatibility Quiz`,
      text: `I scored ${results?.score}% on the ${form.yourName} & ${form.yourSpouseName} Love Quiz! Can you beat my score? 💕`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "from-purple-500 via-pink-500 to-rose-500";
    if (score >= 80) return "from-pink-500 to-rose-500";
    if (score >= 70) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 50) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreMessage = (score) => {
    if (score >= 95) return "Soulmates Forever! 👑";
    if (score >= 90) return "Perfect Match! 💕";
    if (score >= 80) return "Amazing Connection! ✨";
    if (score >= 70) return "Great Understanding! 💖";
    if (score >= 60) return "Nice Compatibility! 💗";
    if (score >= 50) return "Keep Learning! 📚";
    return "Growing Together! 🌱";
  };

  const getScoreDescription = (score) => {
    if (score >= 90)
      return "You know each other inside and out! This is true love 💝";
    if (score >= 80) return "You have a beautiful understanding of each other!";
    if (score >= 70) return "Your connection is special and growing stronger!";
    if (score >= 60) return "Every moment together makes your bond stronger.";
    if (score >= 50) return "Love is a journey, and you're on the right path!";
    return "This is just the beautiful beginning of your story together.";
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (score >= 80) return <Award className="w-6 h-6 text-pink-500" />;
    if (score >= 70) return <Trophy className="w-6 h-6 text-purple-500" />;
    if (score >= 60) return <CheckCheck className="w-6 h-6 text-blue-500" />;
    return <Heart className="w-6 h-6 text-green-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-600 font-medium text-lg"
          >
            Loading your love quiz...
          </motion.p>
          <motion.div
            className="flex justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <Heart className="w-5 h-5 text-purple-400 fill-purple-400" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-md rounded-3xl p-8 border-2 border-pink-100 shadow-2xl shadow-pink-500/20">
            <div className="text-center mb-8">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <AlertCircle className="w-10 h-10 text-red-500" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                Oops! 💔
              </h2>
              <p className="text-gray-600">{error || "Quiz not found"}</p>
            </div>
            <Button onClick={fetchForm} size="lg" className="w-full gap-2">
              <RotateCcw className="w-5 h-5" />
              Try Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------- START SCREEN (Enhanced) ----------
  if (!hasStarted) {
    return (
      <div className="min-h-screen pb-4 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4 md:p-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto space-y-5"
        >
          <div className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-3xl border-2 border-pink-100 shadow-2xl shadow-pink-500/20 overflow-hidden">
            {/* Decorative header */}
            <div className="relative h-32 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500">
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                {/* <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-pink-200">
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                </div> */}
                <motion.img
                  src={love}
                  alt=""
                  className="w-40 h-40"
                  animate={{
                    y: [0, -15, 0], // moves up and down
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            <div className="pt-16 p-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-4">
                {form.yourSpouseName} & {form.yourName}
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                How well do you know each other? 
              </p>

              <div className="flex items-center justify-center gap-8 mb-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-pink-200 shadow-lg">
                    <span className="text-3xl font-bold text-pink-600">
                      {form.yourSpouseName?.charAt(0)?.toUpperCase() || "Y"}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {form.yourSpouseName || "You"}
                  </p>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-purple-200 shadow-lg">
                    <span className="text-3xl font-bold text-purple-600">
                      {form.yourName?.charAt(0)?.toUpperCase() || "P"}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {form.yourName || "Partner"}
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border-2 border-pink-100">
                  <HelpCircle className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent block">
                    {form.fields.length}
                  </span>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                  <Gift className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    1
                  </span>
                  <p className="text-sm text-gray-600">Special Surprise</p>
                </div>
              </div>

              <Button
                onClick={startQuiz}
                size="xl"
                className="w-full gap-3 mb-6 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600"
              >
                <Play className="w-5 h-5" />
                Start Quiz
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Alert variant="pro" className="mt-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="absolute left-4 h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div className="">
                    <AlertTitle className="text-pink-600 text-base">
                      Pro Tip 💡
                    </AlertTitle>
                    <AlertDescription>
                      Think like {form.yourName} would! The more accurately you
                      answer, the higher your score!
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------- QUIZ VIEW (Enhanced) ----------
  if (!showResults) {
    const currentField = form.fields[currentQuestion];
    const progress =
      form.fields.length > 0
        ? ((currentQuestion + 1) / form.fields.length) * 100
        : 0;
    const allAnswered =
      Object.values(answers).filter((v) => v.trim() !== "").length ===
      form.fields.length;
    const answeredCount = Object.values(answers).filter(
      (v) => v.trim() !== "",
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4 md:p-8 pb-32">
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Header with Progress */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-2xl border-2 border-pink-100 shadow-xl shadow-pink-500/10 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToStart}
                className="flex items-center gap-2 px-4 py-2 hover:bg-pink-50 rounded-xl transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-pink-600" />
                <span className="text-sm text-pink-600 font-medium">Exit</span>
              </button>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-800">
                  {form.yourSpouseName} & {form.yourName}
                </p>
                <p className="text-xs text-pink-500">
                  Question {currentQuestion + 1} of {form.fields.length}
                </p>
              </div>
              <div className="w-20"></div>
            </div>

            <div className="relative h-3 w-full overflow-hidden rounded-full bg-pink-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 relative"
              ></motion.div>
            </div>

            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-bold text-pink-600">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-3xl border-2 border-pink-100 shadow-2xl shadow-pink-500/10 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-purple-500/10 border-b-2 border-pink-100 p-6">
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-pink-500/30"
                >
                  {currentQuestion + 1}
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight">
                    {currentField.label}
                  </h3>
                  <p className="text-sm text-pink-600 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Think like {form.yourName} would answer
                  </p>
                </div>
              </div>
            </div>

            {currentField.imageUrl && (
              <div className="relative bg-gradient-to-br from-pink-50/50 to-purple-50/50 p-4">
                <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={currentField.imageUrl}
                    alt={`Question ${currentQuestion + 1}`}
                    className="w-full h-auto max-h-96 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  Your Answer:
                </label>
              </div>

              <div className="space-y-4">
                {currentField.type === "SELECT" ? (
                  <div className="space-y-3">
                    {currentField.options?.map((option, idx) => (
                      <motion.label
                        key={option.optionId}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex items-center p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                          answers[currentField.fieldId] === option.label
                            ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300 shadow-lg shadow-pink-500/20 scale-[1.02]"
                            : "bg-white border-pink-100 hover:border-pink-200 hover:bg-pink-50/50 hover:shadow-md"
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentField.fieldId}
                          value={option.label}
                          checked={
                            answers[currentField.fieldId] === option.label
                          }
                          onChange={(e) =>
                            handleAnswerChange(
                              currentField.fieldId,
                              e.target.value,
                            )
                          }
                          className="hidden"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
                            answers[currentField.fieldId] === option.label
                              ? "border-pink-500 bg-pink-500 shadow-md"
                              : "border-gray-300 group-hover:border-pink-400"
                          }`}
                        >
                          {answers[currentField.fieldId] === option.label && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span
                          className={`font-medium flex-1 transition-colors ${
                            answers[currentField.fieldId] === option.label
                              ? "text-pink-700"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {option.label}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <textarea
                        value={answers[currentField.fieldId] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            currentField.fieldId,
                            e.target.value,
                          )
                        }
                        placeholder={`What would ${form.yourName} say?`}
                        className="w-full h-44 p-5 border-2 border-pink-100 rounded-2xl focus:border-pink-300 focus:ring-4 focus:ring-pink-100 focus:outline-none resize-none text-gray-800 bg-white shadow-lg transition-all placeholder:text-gray-400 text-base"
                        rows="5"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 text-gray-500">
                        <MessageCircle className="w-4 h-4" />
                        Write from the heart
                      </span>
                      <span
                        className={`font-medium ${
                          answers[currentField.fieldId]?.length > 0
                            ? "text-pink-600"
                            : "text-gray-400"
                        }`}
                      >
                        {answers[currentField.fieldId]?.length || 0} characters
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`flex-1 gap-2 ${
                currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            {currentQuestion < form.fields.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={!answers[currentField.fieldId]}
                className={`flex-1 gap-2 ${
                  !answers[currentField.fieldId]
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={submitQuiz}
                disabled={submitting || !allAnswered}
                className={`flex-1 gap-2 ${
                  submitting || !allAnswered
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-green-500/30`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4" />
                    Submit Quiz
                  </>
                )}
              </Button>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <AlertTitle>Submission Error</AlertTitle>
                  <AlertDescription className="mb-3">{error}</AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={submitQuiz}
                    disabled={submitting}
                    className="mt-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Try Again
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Alert>
          )}

          {/* Question Navigator */}
          <div className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-2xl border-2 border-pink-100 shadow-xl shadow-pink-500/5 p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-pink-500" />
                Questions Overview
              </h4>
              <span className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                {answeredCount}/{form.fields.length} Answered
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.fields.map((field, index) => (
                <motion.button
                  key={field.fieldId}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    currentQuestion === index
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-110"
                      : answers[field.fieldId]
                        ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-200"
                        : "bg-white text-gray-400 border-2 border-gray-200 hover:border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- RESULTS VIEW (Enhanced) ----------
  if (showResults && results) {
    const score = results.score;
    const scoreColor = getScoreColor(score);
    const scoreMessage = getScoreMessage(score);
    const scoreDescription = getScoreDescription(score);
    const correctCount =
      results.results?.filter((r) => r.isCorrect).length || 0;
    const totalQuestions =
      results.totalQuestions || results.results?.length || 0;
    const passThreshold = 60;

    return (
      <div
        ref={resultsRef}
        className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4 md:p-8 pb-96 relative"
      >
        {/* Enhanced Confetti */}
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.2}
            colors={[
              "#ec4899",
              "#f472b6",
              "#fda4af",
              "#fb7185",
              "#be185d",
              "#a855f7",
              "#8b5cf6",
            ]}
          />
        )}

        {/* Share Toast */}
        <AnimatePresence>
          {showShareToast && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Link copied to clipboard! 📋</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shaking Gift Animation Overlay */}
        <AnimatePresence>
          {(revealStage === "shaking" || revealStage === "opening") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-500/95 via-rose-500/95 to-purple-500/95 backdrop-blur-lg"
            >
              <motion.div
                className={`relative ${revealStage === "shaking" ? "animate-shake" : ""}`}
              >
                <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Floating sparkles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-200" />
                    </motion.div>
                  ))}

                  {revealStage === "shaking" && (
                    
                      
                      <img src={love} alt="" className="w-48 md:w-56 drop-shadow-2xl"/>
                     
                  )}

                  {revealStage === "opening" && (
                    <motion.div
                      className="flex flex-col items-center justify-center text-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.8 }}
                    >
                      <Heart className="w-32 h-32 md:w-44 md:h-44 text-rose-500 fill-rose-500 drop-shadow-2xl" />
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white font-bold text-2xl mt-6 drop-shadow-lg"
                      >
                        Your Surprise Awaits! 💝
                      </motion.p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed Content - Full Page */}
        <AnimatePresence>
          {showReveal && revealStage === "revealed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-y-auto"
            >
              <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center pb-48 md:pb-36">
                <div className="max-w-5xl w-full mx-auto space-y-6">
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-white/90 to-pink-50/90 backdrop-blur-md px-6 py-4 rounded-2xl border-2 border-pink-100 shadow-2xl shadow-pink-500/20 w-full">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        <img src={love} alt="" className="w-20" />
                      </motion.div>

                      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                        Your Special Message
                      </h1>

                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                        className="flex-shrink-0"
                      >
                        {/* Optional: Add a second icon here if needed */}
                      </motion.div>
                    </div>
                  </motion.div>

                  {form.revealText && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-3xl border-2 border-pink-100 shadow-2xl shadow-pink-500/20 p-8 md:p-10"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          A Love Letter for You
                        </h4>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg italic">
                          "{form.revealText}"
                        </p>
                      </div>
                      <div className="mt-8 pt-6 border-t-2 border-purple-100">
                        <p className="text-right text-gray-600 text-base">
                          With all my love,
                          <br />
                          <span className="font-bold text-purple-600 text-xl">
                            {form.yourName} 💕
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {form.revealImage && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-3xl border-2 border-pink-100 shadow-2xl shadow-pink-500/20 p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg">
                          A Beautiful Memory
                        </h4>
                      </div>
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={form.revealImage}
                          alt="From your partner"
                          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZjZTdmMyIvPjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNkOTQ2ZWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5KXIEF0aG91Z2h0ZnVsIGltYWdlIGZyb20geW91ciBsb3ZlZCBvbmU8L3RleHQ+PC9zdmc+";
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {!form.revealText && !form.revealImage && (
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-3xl border-2 border-pink-100 shadow-2xl shadow-pink-500/20 p-16 text-center"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Heart className="w-12 h-12 text-purple-400 fill-purple-400" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-3">
                        Love Speaks Volumes
                      </h3>
                      <p className="text-gray-500 text-lg">
                        Your partner's love is your special message! 💝
                      </p>
                    </motion.div>
                  )}

                  <div className="flex justify-center gap-3 py-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 ${i % 2 === 0 ? "text-pink-400" : "text-purple-400"} fill-current`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Results Content */}
        {(!showReveal || revealStage !== "revealed") && (
          <div className="max-w-5xl mx-auto space-y-5">
            {/* Score Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-md rounded-3xl border-2 border-pink-100 shadow-2xl shadow-pink-500/20 p-8"
            >
              <div className="flex justify-center mb-8">
                <div className="relative">
                  {/* Animated rings */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`absolute -inset-4 rounded-full bg-gradient-to-r ${scoreColor} opacity-20 blur-2xl`}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute -inset-2 rounded-full bg-gradient-to-r ${scoreColor} opacity-30 blur-xl`}
                  />

                  {/* Score circle */}
                  <div
                    className={`relative w-40 h-40 rounded-full bg-gradient-to-r ${scoreColor} p-1 shadow-2xl`}
                  >
                    <div className="w-full h-full rounded-full bg-white/95 backdrop-blur flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: 0.2,
                        }}
                        className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent leading-none mb-1"
                      >
                        {score}%
                      </motion.div>
                      <div className="text-xs uppercase tracking-widest text-gray-400">
                        Compatibility
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-3 mb-6">
                {score >= passThreshold ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full"
                  >
                    <PartyPopper className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-emerald-700">
                      Perfect Match!
                    </span>
                    <PartyPopper className="w-5 h-5 text-emerald-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full"
                  >
                    <Flower2 className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-amber-700">
                      Growing Together
                    </span>
                    <Flower2 className="w-5 h-5 text-amber-600" />
                  </motion.div>
                )}
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {getScoreIcon(score)}
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {scoreMessage}
                  </h2>
                  {getScoreIcon(score)}
                </div>
                <p className="text-gray-600 text-lg">{scoreDescription}</p>
              </div>

              {/* Answer Summary */}
              {/* Answer Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 border-2 border-gray-200 mb-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Correct:
                      </span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {results?.results?.map(
                        (result, index) =>
                          result.isCorrect && (
                            <div
                              key={index}
                              className="md:w-10 md:h-10 w-6 h-6 bg-emerald-100 border-2 border-emerald-300 rounded-md md:rounded-xl flex items-center justify-center font-semibold text-emerald-700 shadow-sm text-xs md:text-lg"
                            >
                              {index + 1}
                            </div>
                          ),
                      )}
                      {results?.results?.filter((r) => r.isCorrect).length ===
                        0 && (
                        <span className="text-sm text-gray-500 italic">
                          No correct answers
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-px h-8 bg-gray-300 hidden md:block" />

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Wrong:
                      </span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {results?.results?.map(
                        (result, index) =>
                          !result.isCorrect && (
                            <div
                              key={index}
                              className="md:w-10 md:h-10 w-6 h-6 bg-rose-100 border-2 border-rose-300 rounded-md md:rounded-xl flex items-center justify-center font-semibold text-rose-700 shadow-sm text-xs md:text-lg"
                            >
                              {index + 1}
                            </div>
                          ),
                      )}
                      {results?.results?.filter((r) => !r.isCorrect).length ===
                        0 && (
                        <span className="text-sm text-gray-500 italic">
                          No wrong answers
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-600">Correct</span>
                  </div>
                  <span className="text-3xl font-bold text-emerald-600">
                    {correctCount}
                  </span>
                  <span className="text-gray-500 ml-1">/{totalQuestions}</span>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border-2 border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-rose-600" />
                    <span className="text-sm text-gray-600">Score</span>
                  </div>
                  <span className="text-3xl font-bold text-rose-600">
                    {score}
                  </span>
                  <span className="text-gray-500 ml-1">%</span>
                </div>
              </div>
            </motion.div>

            {/* Scratch to Reveal Card - Luxurious Valentine's Edition */}
            {!scratched && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                }}
                className="relative rounded-[2rem] overflow-hidden shadow-2xl"
              >
                {/* Animated romantic gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
                  {/* Floating rose petals */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          x: Math.random() * window.innerWidth,
                          y: -100,
                          rotate: 0,
                          opacity: 0.6,
                        }}
                        animate={{
                          y: window.innerHeight + 100,
                          x: `calc(${Math.random() * 100}% + ${Math.sin(i) * 50}px)`,
                          rotate: 360,
                          opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                          duration: 15 + Math.random() * 10,
                          repeat: Infinity,
                          delay: Math.random() * 5,
                          ease: "linear",
                        }}
                        className="absolute w-4 h-4"
                      >
                        <div className="w-4 h-4 bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-full blur-sm" />
                        <div className="absolute inset-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                              fill={`rgba(244, 114, 182, ${0.2 + Math.random() * 0.2})`}
                            />
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Glowing orbs for depth */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-rose-300/30 to-pink-300/30 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-pink-300/30 to-red-300/30 rounded-full blur-3xl"
                  />
                </div>

                {/* Main card with glassmorphism */}
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/95 to-rose-50/95 border border-white/50">
                  {/* Romantic header with animated border */}
                  <div className="relative px-6 pt-6 pb-2 overflow-hidden">
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-red-400" />

                    <div className="relative flex items-start gap-5">
                      <div className="flex-1">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center flex-wrap gap-3 mb-2"
                        >
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                            💝 From {form.yourSpouseName}
                          </h3>
                          <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full border border-rose-200 shadow-sm">
                            Secret Valentine Surprise Love 💌
                          </span>
                        </motion.div>

                        
                      </div>
                    </div>
                  </div>

                  {/* Scratch area - Valentine's themed */}
                  <div className="relative h-[22rem] md:h-[28rem] cursor-pointer select-none touch-none group">
                    {/* Romantic background content */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center max-w-md mx-auto space-y-8">
                        {/* Animated heart with rings */}
                        <div className="relative flex justify-center">
                          {/* Pulsing rings */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 1.5 + i * 0.2, 1],
                                opacity: [0.3, 0, 0.3],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.4,
                              }}
                              className="absolute inset-0 rounded-full border-2 border-rose-300/30"
                              style={{
                                width: 80 + i * 30,
                                height: 80 + i * 30,
                                margin: "auto",
                              }}
                            />
                          ))}

                          {/* Main heart */}
                          <motion.div
                            animate={{
                              scale: [1, 1.15, 1],
                              rotate: [0, 8, -8, 0],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="relative"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur-2xl opacity-40" />
                            {/* <div className="relative w-28 h-28 bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
                              <Heart className="w-14 h-14 text-white fill-white drop-shadow-2xl" />
                            </div> */}
                            <img src={love} alt="" className="relative w-40"/>
                          </motion.div>
                        </div>

                        

                       
                      </div>
                    </div>

                    {/* Scratch canvas with romantic border effect */}
                    <canvas
                      ref={scratchCanvasRef}
                      className="absolute inset-0 w-full h-full cursor-cell touch-none"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      
                    />

                    {/* Progress indicator - Valentine's style */}
                    {scratchProgress > 0 && scratchProgress < 55 && (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-6 left-6 right-6"
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-rose-100">
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                                  Revealing love...
                                </span>
                                <span className="text-sm font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                  {Math.round(scratchProgress)}%
                                </span>
                              </div>
                              <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${scratchProgress}%` }}
                                  transition={{ type: "spring", stiffness: 60 }}
                                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 rounded-full relative"
                                >
                                  <motion.div
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                  />
                                </motion.div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Romantic footer with Valentine's motifs */}
                  <div className="relative px-6 py-5 border-t border-rose-100 bg-gradient-to-r from-white/80 to-rose-50/80">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <span className="text-rose-400 text-xl">❤️</span>
                        </motion.div>
                        <span className="text-sm text-gray-600">
                          Love is in the details
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-rose-500 bg-rose-100 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          Sealed with love
                        </span>
                      </div>
                    </div>

                    {/* Animated romantic dots */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-1 pb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          className="w-1 h-1 bg-rose-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Custom animations */}
                <style jsx>{`
                  @keyframes float {
                    0%,
                    100% {
                      transform: translateY(0px);
                    }
                    50% {
                      transform: translateY(-10px);
                    }
                  }
                  @keyframes heartbeat {
                    0% {
                      transform: scale(1);
                    }
                    14% {
                      transform: scale(1.3);
                    }
                    28% {
                      transform: scale(1);
                    }
                    42% {
                      transform: scale(1.3);
                    }
                    70% {
                      transform: scale(1);
                    }
                  }
                `}</style>
              </motion.div>
            )}
          </div>
        )}

        {showReveal && revealStage === "revealed" && (
          <>
            {/* Fixed Bottom Banner - Swipe to Unlock Career */}
            <SwipeToUnlockCareer />
          </>
        )}

        {/* Enhanced Animation Styles */}
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-15px) rotate(-10deg); }
            20%, 40%, 60%, 80% { transform: translateX(15px) rotate(10deg); }
          }
          @keyframes boom {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.4) rotate(15deg); opacity: 0.9; }
            100% { transform: scale(30) rotate(45deg); opacity: 0; }
          }
          .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
          .animate-slideUp { animation: slideUp 0.7s ease-out; }
          .animate-shake { animation: shake 0.5s ease-in-out infinite; }
          .animate-boom { animation: boom 0.8s ease-out forwards; }
          .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
          .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background: #f9a8d4; border-radius: 20px; }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #f472b6; }
        `}</style>

        <style>{`
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes slideUp {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-15px) rotate(-10deg); }
    20%, 40%, 60%, 80% { transform: translateX(15px) rotate(10deg); }
  }
  @keyframes boom {
    0% { transform: scale(1) rotate(0deg); opacity: 1; }
    50% { transform: scale(1.4) rotate(15deg); opacity: 0.9; }
    100% { transform: scale(30) rotate(45deg); opacity: 0; }
  }
  .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
  .animate-slideUp { animation: slideUp 0.7s ease-out; }
  .animate-shake { animation: shake 0.5s ease-in-out infinite; }
  .animate-boom { animation: boom 0.8s ease-out forwards; }
  .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: #f9a8d4; border-radius: 20px; }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #f472b6; }
  
  /* Custom scratch cursor */
  canvas[class*="cursor-cell"] {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="rgba(236, 72, 153, 0.3)" stroke="rgba(236, 72, 153, 0.8)" stroke-width="2"/><circle cx="20" cy="20" r="10" fill="rgba(255, 255, 255, 0.8)"/></svg>') 20 20, auto;
  }
  canvas[class*="cursor-cell"]:active {
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="rgba(236, 72, 153, 0.5)" stroke="rgba(236, 72, 153, 1)" stroke-width="3"/><circle cx="20" cy="20" r="10" fill="rgba(255, 255, 255, 1)"/></svg>') 20 20, auto;
  }
`}</style>
      </div>
    );
  }
};

export default FormView;
