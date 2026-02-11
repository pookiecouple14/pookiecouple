// components/FormView.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios';
import { motion } from 'framer-motion';
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
  PlusCircle,
  Wand2,
  Briefcase
} from 'lucide-react';
import Confetti from 'react-confetti';

// Shadcn/ui style components
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    const variants = {
      default:
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/20",
      destructive:
        "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/20",
      outline:
        "border-2 border-pink-200 bg-white text-pink-600 hover:bg-pink-50 hover:border-pink-300",
      secondary:
        "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200",
      ghost: "text-pink-600 hover:bg-pink-50",
      link: "text-pink-500 underline-offset-4 hover:underline",
      create: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/20",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 py-1.5 text-sm",
      lg: "h-11 px-6 py-3 text-base",
      icon: "h-9 w-9",
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

const Alert = React.forwardRef(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const variants = {
      default:
        "bg-gradient-to-r from-pink-50/50 to-rose-50/50 border border-pink-200 text-pink-800",
      destructive:
        "bg-gradient-to-r from-red-50/50 to-rose-50/50 border border-red-200 text-red-800",
      success:
        "bg-gradient-to-r from-emerald-50/50 to-green-50/50 border border-emerald-200 text-emerald-800",
    };

    return (
      <div
        ref={ref}
        className={`relative rounded-lg p-3 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5
    ref={ref}
    className={`font-semibold text-sm mb-0.5 ${className}`}
    {...props}
  />
));

const AlertDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`text-xs ${className}`} {...props} />
  ),
);

const FormView = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealStage, setRevealStage] = useState('idle');
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const confettiRef = useRef(null);
  const canvasRef = useRef(null);
  const scratchCanvasRef = useRef(null);
  const [scratched, setScratched] = useState(false);
  const lastPointRef = useRef(null);

  useEffect(() => {
    fetchForm();
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [formId]);

  useEffect(() => {
    if (showResults && results?.score >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showResults, results]);

  // Initialize scratch canvas with improved graphics
  useEffect(() => {
    if (scratchCanvasRef.current && !scratched && showResults) {
      const canvas = scratchCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      
      // Set canvas size with high DPI support
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);

      // Create luxurious Valentine's scratch surface
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#ec4899');
      gradient.addColorStop(0.3, '#f472b6');
      gradient.addColorStop(0.6, '#fb7185');
      gradient.addColorStop(1, '#be185d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add shimmer overlay
      const shimmer = ctx.createLinearGradient(0, 0, rect.width, 0);
      shimmer.addColorStop(0, 'rgba(255, 255, 255, 0)');
      shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
      shimmer.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Add decorative hearts pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = 8 + Math.random() * 18;
        drawHeart(ctx, x, y, size);
      }

      // Add subtle sparkles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const size = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add main text with shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('💕 Scratch to Reveal 💕', rect.width / 2, rect.height / 2 - 15);
      
      ctx.font = '16px Arial';
      ctx.fillText('Your Special Message', rect.width / 2, rect.height / 2 + 20);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
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
    // Left curve
    ctx.bezierCurveTo(
      0, 0,
      -size / 2, 0,
      -size / 2, topCurveHeight
    );
    ctx.bezierCurveTo(
      -size / 2, (topCurveHeight + size) / 2,
      0, (topCurveHeight + size) / 1.2,
      0, size
    );
    // Right curve
    ctx.bezierCurveTo(
      0, (topCurveHeight + size) / 1.2,
      size / 2, (topCurveHeight + size) / 2,
      size / 2, topCurveHeight
    );
    ctx.bezierCurveTo(
      size / 2, 0,
      0, 0,
      0, topCurveHeight
    );
    ctx.fill();
    ctx.restore();
  };

  const scratch = (e) => {
    if (!scratchCanvasRef.current || scratched) return;

    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    let x, y;
    if (e.type.includes('touch')) {
      const touch = e.touches[0] || e.changedTouches[0];
      x = (touch.clientX - rect.left) * dpr;
      y = (touch.clientY - rect.top) * dpr;
    } else {
      x = (e.clientX - rect.left) * dpr;
      y = (e.clientY - rect.top) * dpr;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 40 * dpr; // Responsive brush size

    // Draw smooth line from last point
    if (lastPointRef.current && isScratching) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // Draw circle for single point
      ctx.beginPath();
      ctx.arc(x, y, (20 * dpr), 0, 2 * Math.PI);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    // Check scratch progress less frequently for better performance
    if (Math.random() < 0.3) {
      checkScratchProgress();
    }
  };

  const checkScratchProgress = () => {
    if (!scratchCanvasRef.current) return;

    const canvas = scratchCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let transparent = 0;
    const step = 4; // Sample every 4th pixel for performance
    
    for (let i = 3; i < pixels.length; i += (4 * step)) {
      if (pixels[i] < 128) transparent++;
    }

    const progress = (transparent / (pixels.length / (4 * step))) * 100;
    setScratchProgress(progress);

    if (progress > 50 && !scratched) {
      setScratched(true);
      
      // Fade out canvas smoothly
      if (scratchCanvasRef.current) {
        scratchCanvasRef.current.style.transition = 'opacity 0.8s ease-out';
        scratchCanvasRef.current.style.opacity = '0';
      }
      
      // After fade, show shaking gift
      setTimeout(() => {
        setRevealStage('shaking');
      }, 800);
      
      // Trigger confetti during shake
      setTimeout(() => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }, 1200);
      
      // After 2 seconds of shaking, boom to reveal
      setTimeout(() => {
        setRevealStage('opening');
      }, 2800);
      
      // Show reveal page after boom animation
      setTimeout(() => {
        setRevealStage('revealed');
        setShowReveal(true);
      }, 3600);
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
      setError('');
      const response = await axios.get(`/form/${formId}`);
      
      if (!response.data || !response.data.fields) {
        throw new Error('Invalid form data structure');
      }
      
      setForm(response.data);
      
      const initialAnswers = {};
      if (Array.isArray(response.data.fields)) {
        response.data.fields.forEach(field => {
          if (field && field.fieldId) {
            initialAnswers[field.fieldId] = '';
          }
        });
      }
      setAnswers(initialAnswers);
      
    } catch (err) {
      console.error('Error fetching form:', err);
      setError(err.response?.data?.message || 'Failed to load quiz. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (fieldId, value) => {
    setAnswers(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < form.fields.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const startQuiz = () => {
    setHasStarted(true);
    setCurrentQuestion(0);
    const initialAnswers = {};
    form.fields.forEach(field => {
      if (field && field.fieldId) {
        initialAnswers[field.fieldId] = '';
      }
    });
    setAnswers(initialAnswers);
  };

  const submitQuiz = async () => {
    try {
      setSubmitting(true);
      setError('');
      
      if (!form || !Array.isArray(form.fields) || form.fields.length === 0) {
        throw new Error('No questions available');
      }

      const formattedAnswers = Object.entries(answers)
        .filter(([fieldId, value]) => fieldId && value !== undefined && value !== '')
        .map(([fieldId, value]) => ({
          fieldId: fieldId.trim(),
          value: String(value).trim()
        }));

      console.log('Submitting answers:', { answers: formattedAnswers });

      const response = await axios.post(
        `/form/${formId}/submit`, 
        { answers: formattedAnswers },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
          timeout: 10000,
        }
      );

      console.log('Submit response:', response.data);

      const resultsData = {
        responseId: response.data.responseId,
        score: response.data.score || 0,
        questions: form.fields.map(field => ({
          ...field,
          userAnswer: answers[field.fieldId] || '',
          submitted: !!answers[field.fieldId]
        }))
      };

      setResults(resultsData);
      setShowResults(true);
      setShowReveal(false);
      setRevealStage('idle');
      setScratched(false);
      setScratchProgress(0);
      
      if (resultsData.score >= 80) {
        setShowConfetti(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
      console.error('Error details:', err.response?.data);
      
      let errorMessage = 'Failed to submit quiz. Please try again.';
      
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err.response) {
        errorMessage = err.response.data?.message || err.response.data?.error || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleReveal = () => {
    if (showReveal || revealStage === 'revealed') {
      setRevealStage('idle');
      setShowReveal(false);
    } else {
      setRevealStage('shaking');
      
      setTimeout(() => {
        setRevealStage('opening');
      }, 3000);
      
      setTimeout(() => {
        setRevealStage('revealed');
        setShowReveal(true);
      }, 4000);
    }
  };

  const restartQuiz = () => {
    setHasStarted(true);
    setShowResults(false);
    setShowReveal(false);
    setRevealStage('idle');
    setShowConfetti(false);
    setResults(null);
    setScratched(false);
    setScratchProgress(0);
    setCurrentQuestion(0);
    const initialAnswers = {};
    form.fields.forEach(field => {
      if (field && field.fieldId) {
        initialAnswers[field.fieldId] = '';
      }
    });
    setAnswers(initialAnswers);
  };

  const goToStart = () => {
    setHasStarted(false);
    setShowResults(false);
    setShowReveal(false);
    setRevealStage('idle');
    setShowConfetti(false);
    setResults(null);
    setScratched(false);
    setScratchProgress(0);
  };

  const handleCreateOwn = () => {
    navigate('/');
  };

  const handleCareerRedirect = () => {
    window.open('https://your-career-platform.com', '_blank');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "from-purple-500 to-pink-500";
    if (score >= 80) return "from-pink-500 to-rose-500";
    if (score >= 70) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 50) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return "Perfect Match! 💕";
    if (score >= 80) return "Amazing Connection! ✨";
    if (score >= 70) return "Great Understanding! 💖";
    if (score >= 60) return "Nice Compatibility! 💗";
    if (score >= 50) return "Keep Learning! 📚";
    return "Growing Together! 🌱";
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return "You know your partner incredibly well!";
    if (score >= 60) return "You have a wonderful understanding of your partner.";
    if (score >= 40) return "Every relationship grows stronger with time.";
    return "This is just the beginning of your beautiful journey together.";
  };

  // Valentine-themed Promotional Banner Component
  const PromotionalBanner = () => {
    if (!showPromoBanner) return null;

    return (
    <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="fixed bottom-0 left-0 right-0 z-50"
                >
                  <motion.div
                    className="relative m-3 md:m-0 rounded-2xl md:rounded-none bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white p-4 md:p-6 shadow-2xl border-t border-pink-300/50 backdrop-blur-sm overflow-hidden md:rounded-t-3xl"
                    whileHover={{ scale: 1.005 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Animated background shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/30 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Content Container - Centered on desktop */}
                    <div className="relative z-10 max-w-7xl mx-auto">
                      <div className="flex items-center justify-between gap-4 md:gap-6">
                        {/* Left side - Icon + Text */}
                        <div className="flex items-center gap-3 md:gap-4 flex-1">
                          {/* Animated icon container */}
                          <motion.div
                            className="bg-white/20 p-2.5 md:p-3 rounded-xl backdrop-blur-sm flex-shrink-0"
                            animate={{
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                            </motion.div>
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1">
                            <motion.h4
                              className="font-bold text-white text-sm md:text-lg mb-0.5 md:mb-1 drop-shadow-md"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              Found your life partner? 👀
                            </motion.h4>
                            <motion.p
                              className="text-xs md:text-base text-pink-50 leading-tight drop-shadow"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              Also, find the career you’ll love for life
                              💼✨
                            </motion.p>
                          </div>
                        </div>

                        {/* Right side - CTA button */}
                        <motion.button
                          // onClick={handleCareerRedirect}
                          className="bg-white text-pink-600 hover:bg-pink-50 font-bold px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <span className="hidden sm:inline font-semibold">
                            Explore Career Growth
                          </span>

                          <motion.div
                            animate={{
                              x: [0, 3, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Pulsing glow effect at the top */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scaleX: [0.8, 1, 0.8],
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <PromotionalBanner />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600 font-medium">Loading your love quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <PromotionalBanner />
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-6 border-2 border-pink-100 shadow-lg shadow-pink-500/10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">Oops!</h2>
              <p className="text-gray-600">{error || 'Quiz not found'}</p>
            </div>
            <Button
              onClick={fetchForm}
              className="w-full gap-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  

  // START SCREEN
  if (!hasStarted) {
    return (
      <div className="min-h-screen pb-36 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-3 md:p-6">
        <PromotionalBanner />
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-pink-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10">
              <div className="text-3xl">🎀</div>
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Pookie Love Quiz
              </h1>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10">
            {/* Couple Info */}
            <div className="p-6 md:p-8 text-center">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full mx-auto mb-3 flex items-center justify-center border-2 border-pink-200 shadow-lg shadow-pink-500/10">
                    <span className="text-2xl font-bold text-pink-600">
                      {form.yourName?.charAt(0)?.toUpperCase() || 'Y'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{form.yourName || 'You'}</p>
                </div>
                
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-3 flex items-center justify-center border-2 border-purple-200 shadow-lg shadow-purple-500/10">
                    <span className="text-2xl font-bold text-purple-600">
                      {form.yourSpouseName?.charAt(0)?.toUpperCase() || 'P'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{form.yourSpouseName || 'Partner'}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
                How well do you know {form.yourSpouseName}?
              </h2>
              <p className="text-gray-600 mb-8">
                Answer questions as your partner would to discover your compatibility score and unlock a special message! 💕
              </p>

              {/* Quiz Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-white to-pink-50/50 border-2 border-pink-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <HelpCircle className="w-5 h-5 text-pink-500" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      {form.fields.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Questions</p>
                </div>
                <div className="bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-purple-500" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      1
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Special Surprise</p>
                </div>
              </div>

              {/* Start Button */}
              <Button
                onClick={startQuiz}
                className="w-full gap-3 py-4 h-auto"
                size="lg"
              >
                <Play className="w-5 h-5" />
                Start Quiz
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 border-t-2 border-pink-100 p-6">
              <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                How it works:
              </h3>
              <div className="space-y-3">
                {[
                  'Answer each question as your partner would',
                  'Complete all questions to get your compatibility score',
                  'Unlock a special message from your loved one',
                  'Share your results and challenge friends!'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <Alert variant="default" className="mt-4">
                <div className="flex items-start gap-2">
                  <InfoIcon className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <AlertTitle className="text-pink-600">Pro Tip</AlertTitle>
                    <AlertDescription>
                      Think carefully about each answer - this quiz was specially created for you by {form.yourName}! 💕
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  // QUIZ VIEW
  if (!showResults) {
    const currentField = form.fields[currentQuestion];
    const progress = form.fields.length > 0 ? ((currentQuestion + 1) / form.fields.length) * 100 : 0;
    const allAnswered = Object.values(answers).filter(v => v.trim() !== '').length === form.fields.length;
    const answeredCount = Object.values(answers).filter(v => v.trim() !== '').length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-3 md:p-6">
        <PromotionalBanner />
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Header with Progress */}
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={goToStart}
                className="flex items-center gap-2 px-3 py-2 hover:bg-pink-50 rounded-xl transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-pink-600" />
                <span className="text-sm text-pink-600 font-medium">Back</span>
              </button>
              
              <div className="text-center">
                <p className="text-sm font-bold text-gray-800">{form.yourName} & {form.yourSpouseName}</p>
                <p className="text-xs text-pink-500">Question {currentQuestion + 1} of {form.fields.length}</p>
              </div>

              <div className="w-20"></div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-pink-100">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-pink-500/5 to-rose-500/5 border-b-2 border-pink-100 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-lg shadow-pink-500/30">
                  {currentQuestion + 1}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight">{currentField.label}</h3>
                  <p className="text-xs md:text-sm text-pink-600 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Think from {form.yourSpouseName}'s perspective
                  </p>
                </div>
              </div>
            </div>

            {/* Question Image (if available) */}
            {currentField.imageUrl && (
              <div className="relative bg-gradient-to-br from-pink-50/30 to-purple-50/30">
                <img 
                  src={currentField.imageUrl} 
                  alt={`Question ${currentQuestion + 1}`}
                  className="w-full h-auto max-h-80 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Answer Input Section */}
            <div className="p-5 md:p-6">
              <div className="mb-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  Your Answer:
                </label>
              </div>

              <div className="space-y-3">
                {currentField.type === 'SELECT' ? (
                  <div className="space-y-2.5">
                    {currentField.options?.map((option) => (
                      <label
                        key={option.optionId}
                        className={`group flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                          answers[currentField.fieldId] === option.label
                            ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300 shadow-md shadow-pink-500/10 scale-[1.02]'
                            : 'bg-white border-pink-100 hover:border-pink-200 hover:bg-pink-50/30 hover:shadow-sm'
                        }`}
                      >
                        <input
                          type="radio"
                          name={currentField.fieldId}
                          value={option.label}
                          checked={answers[currentField.fieldId] === option.label}
                          onChange={(e) => handleAnswerChange(currentField.fieldId, e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${
                          answers[currentField.fieldId] === option.label
                            ? 'border-pink-500 bg-pink-500 shadow-sm'
                            : 'border-gray-300 group-hover:border-pink-400'
                        }`}>
                          {answers[currentField.fieldId] === option.label && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className={`font-medium transition-colors ${
                          answers[currentField.fieldId] === option.label
                            ? 'text-pink-700'
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {option.label}
                        </span>
                        {answers[currentField.fieldId] === option.label && (
                          <CheckCircle className="w-5 h-5 text-pink-500 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative">
                      <textarea
                        value={answers[currentField.fieldId] || ''}
                        onChange={(e) => handleAnswerChange(currentField.fieldId, e.target.value)}
                        placeholder={`What would ${form.yourSpouseName} say?`}
                        className="w-full h-36 p-4 border-2 border-pink-100 rounded-xl focus:border-pink-300 focus:ring-4 focus:ring-pink-100 focus:outline-none resize-none text-gray-800 bg-white shadow-sm transition-all placeholder:text-gray-400"
                        rows="4"
                      />
                      {answers[currentField.fieldId] && (
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Express their true feelings
                      </span>
                      <span className={`font-medium ${
                        answers[currentField.fieldId]?.length > 0 
                          ? 'text-pink-600' 
                          : 'text-gray-400'
                      }`}>
                        {answers[currentField.fieldId]?.length || 0} characters
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`flex-1 gap-2 ${
                currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
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
                  !answers[currentField.fieldId] ? 'opacity-50 cursor-not-allowed' : ''
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
                  submitting || !allAnswered ? 'opacity-50 cursor-not-allowed' : ''
                } bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-green-500/20`}
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

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <AlertTitle>Submission Error</AlertTitle>
                  <AlertDescription className="mb-2">{error}</AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={submitQuiz}
                    disabled={submitting}
                    className="mt-2 text-xs"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Try Again
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Alert>
          )}

          {/* Progress Indicators */}
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/5 p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-pink-500" />
                Your Progress
              </h4>
              <span className="text-sm text-pink-600 font-semibold">
                {answeredCount}/{form.fields.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.fields.map((field, index) => (
                <button
                  key={field.fieldId}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    currentQuestion === index
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-110'
                      : answers[field.fieldId]
                      ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-200 hover:scale-105'
                      : 'bg-white text-gray-400 border-2 border-gray-200 hover:border-pink-200 hover:bg-pink-50/30'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS VIEW
  if (showResults && results) {
    const score = results.score;
    const scoreColor = getScoreColor(score);
    const scoreMessage = getScoreMessage(score);
    const scoreDescription = getScoreDescription(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-3 md:p-6 relative">
        <PromotionalBanner />
        
        {/* Confetti */}
        {showConfetti && (
          <Confetti
            ref={confettiRef}
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            colors={['#ec4899', '#f472b6', '#fda4af', '#fb7185', '#be185d']}
          />
        )}

        {/* Shaking Gift Animation Overlay */}
        {(revealStage === 'shaking' || revealStage === 'opening') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50/95 via-rose-50/95 to-purple-50/95 backdrop-blur-sm">
            <div className={`relative ${revealStage === 'shaking' ? 'animate-shake' : 'animate-boom'}`}>
              <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                {/* Sparkle effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
                
                {/* Floating sparkles */}
                <div className="absolute top-6 right-6 animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }}>
                  <Sparkles className="w-8 h-8 text-yellow-200" />
                </div>
                <div className="absolute bottom-6 left-6 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '1s' }}>
                  <Sparkles className="w-6 h-6 text-yellow-200" />
                </div>
                <div className="absolute top-6 left-6 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1s' }}>
                  <Sparkles className="w-7 h-7 text-yellow-200" />
                </div>
                
                {revealStage === 'shaking' && (
                  <div className="text-center">
                    <Gift className="w-32 h-32 md:w-40 md:h-40 text-white drop-shadow-2xl" />
                    <p className="text-white font-bold text-lg md:text-xl mt-4 drop-shadow-lg">
                      Opening...
                    </p>
                  </div>
                )}
                
                {revealStage === 'opening' && (
                  <div className="text-center">
                    <Heart className="w-32 h-32 md:w-40 md:h-40 text-white fill-white drop-shadow-2xl animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Revealed Content - Full Page */}
        {showReveal && revealStage === 'revealed' && (
          <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 overflow-y-auto animate-fadeIn">
            <div className="min-h-screen p-3 md:p-6">
              <div className="max-w-2xl mx-auto space-y-4 pt-4 animate-slideUp">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-pink-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 mb-4">
                    <Gift className="w-6 h-6 text-purple-500" />
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Your Special Message
                    </h1>
                  </div>
                </div>

                {/* Message Card */}
                {form.revealText && (
                  <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-purple-500" />
                      <h4 className="font-bold text-gray-800">A Message for You</h4>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                        {form.revealText}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-purple-100">
                      <p className="text-right text-gray-600 text-sm">
                        With all my love,<br />
                        <span className="font-bold text-purple-600 text-base">{form.yourSpouseName} 💕</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Image Card */}
                {form.revealImage && (
                  <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                      <h4 className="font-bold text-gray-800">A Special Memory</h4>
                    </div>
                    <div className="rounded-xl overflow-hidden border-2 border-purple-100">
                      <img 
                        src={form.revealImage} 
                        alt="From your partner"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2ZjZTdmMyIvPjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNkOTQ2ZWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5KXIEF0aG91Z2h0ZnVsIGltYWdlIGZyb20geW91ciBsb3ZlZCBvbmU8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* No content message */}
                {!form.revealText && !form.revealImage && (
                  <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 mb-2">No message yet</h3>
                    <p className="text-gray-500">
                      Your partner hasn't added a special message, but your love speaks volumes! 💕
                    </p>
                  </div>
                )}

                {/* Decorative Hearts */}
                <div className="flex justify-center gap-2 py-4">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={restartQuiz}
                    size="lg"
                    className="w-full gap-2 px-8 py-4 h-auto"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Play Again
                    <Sparkles className="w-5 h-5" />
                  </Button>

                  {/* Create Your Own Prompt */}
                  <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 rounded-2xl border-2 border-purple-200 p-5 shadow-sm">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20">
                        <Wand2 className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-base font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Create Your Own Love Quiz!
                      </h4>
                      <p className="text-sm text-gray-600">
                        Want to create a beautiful quiz like this for your partner? It only takes a few minutes to make something truly special! 💝
                      </p>
                    </div>
                    <Button
                      variant="create"
                      onClick={handleCreateOwn}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Create My Quiz
                      <Sparkles className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Results Content */}
        {(!showReveal || revealStage !== 'revealed') && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Header */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-pink-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10">
                <Trophy className="w-6 h-6 text-pink-500" />
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  Quiz Complete!
                </h1>
              </div>
            </div>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10 p-8">
              {/* Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  {/* Glow */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${scoreColor} opacity-20 blur-xl`} />
                  
                  {/* Border */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${scoreColor} p-1`}>
                    <div className="w-full h-full rounded-full bg-white"></div>
                  </div>

                  {/* Inner Circle */}
                  <div className="absolute inset-2 rounded-full bg-white/90 backdrop-blur flex flex-col items-center justify-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent leading-none mb-1`}>
                      {score}%
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400">
                      Score
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Message */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                  {scoreMessage}
                </h2>
                <p className="text-gray-600">
                  {scoreDescription}
                </p>
              </div>
            </div>

            {/* Scratch to Reveal Card */}
            {!scratched && (
              <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-2xl border-2 border-purple-100 shadow-lg shadow-purple-500/10 overflow-hidden">
                <div className="p-4 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Special Message from {form.yourSpouseName}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Scratch below to reveal your surprise! 💕
                  </p>
                </div>
                
                <div className="relative h-64 md:h-80 cursor-pointer select-none touch-none">
                  {/* Hidden Content */}
                  <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className="mb-4">
                        <Heart className="w-16 h-16 text-rose-500 fill-rose-500 mx-auto animate-pulse" />
                      </div>
                      {form.revealText ? (
                        <>
                          <p className="text-gray-700 text-base leading-relaxed mb-4">
                            {form.revealText.slice(0, 100)}
                            {form.revealText.length > 100 ? '...' : ''}
                          </p>
                          <p className="text-purple-600 font-semibold text-sm">
                            Keep scratching to reveal more! →
                          </p>
                        </>
                      ) : (
                        <p className="text-gray-600 text-sm">
                          A special message awaits you! 💕
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Scratch Canvas */}
                  <canvas
                    ref={scratchCanvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'none' }}
                  />
                </div>

                {/* Progress Indicator */}
                {scratchProgress > 0 && scratchProgress < 50 && (
                  <div className="px-6 pb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Keep scratching...</span>
                      <span>{Math.round(scratchProgress)}%</span>
                    </div>
                    <div className="h-1 bg-purple-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${scratchProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {!scratched && (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={restartQuiz}
                    className="flex-1 gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={goToStart}
                    className="flex-1 gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Back to Start
                  </Button>
                </div>

                {/* Create Your Own Prompt */}
                <div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 rounded-2xl border-2 border-purple-200 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
                      <Wand2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                        Create Your Own Love Quiz!
                      </h4>
                      <p className="text-xs text-gray-600 mb-3">
                        Make a beautiful quiz for your partner in just a few minutes! 💝
                      </p>
                      <Button
                        variant="create"
                        onClick={handleCreateOwn}
                        size="sm"
                        className="gap-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Create My Quiz
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}



        
        
        {/* Smooth Animations */}
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes slideUp {
            0% { 
              opacity: 0;
              transform: translateY(30px);
            }
            100% { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideIn {
            0% { 
              opacity: 0;
              transform: translateX(100px);
            }
            100% { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-12px) rotate(-8deg); }
            20%, 40%, 60%, 80% { transform: translateX(12px) rotate(8deg); }
          }
          
          @keyframes boom {
            0% { 
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% { 
              transform: scale(1.3) rotate(10deg);
              opacity: 0.9;
            }
            100% { 
              transform: scale(25) rotate(45deg);
              opacity: 0;
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          
          .animate-slideUp {
            animation: slideUp 0.7s ease-out;
          }
          
          .animate-slideIn {
            animation: slideIn 0.8s ease-out;
          }
          
          .animate-shake {
            animation: shake 0.5s ease-in-out infinite;
          }
          
          .animate-boom {
            animation: boom 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }
};

// Helper component for info icon
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

export default FormView;