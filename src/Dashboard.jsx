import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  HeartHandshake,
  Unlock,
  Lock,
  Star,
  Heart,
  LogOut,
  Calendar,
  Users,
  Award,
  ArrowLeft,
  Eye,
  Plus,
  CheckCircle,
  Radio,
  TextCursor,
  List,
  Share2,
  Copy,
  ExternalLink,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Briefcase,
  ArrowRight,
} from "lucide-react";

 // ---------- Enhanced Swipe‑to‑unlock career banner (fixed ref error) ----------
const SwipeToUnlockCareer = () => {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const thumbWidth = 56; // w-14 = 56px

  const dragX = useMotionValue(0);
  const labelOpacity = useTransform(dragX, [0, trackWidth - thumbWidth], [1, 0]);

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
        "https://www.errormakesclever.com/valentine?workshop_id=67&source=Webinar_career_love_game",
        "_blank"
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
        className="relative m-3 md:m-4 rounded-2xl md:rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 text-white p-4 md:p-5 shadow-2xl border border-pink-300/30 backdrop-blur-sm overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated background gradient */}
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

        {/* Floating hearts and stars */}
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

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Left side – enhanced icon + text */}
            <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
              <motion.div
                className="bg-white/20 p-3 rounded-xl backdrop-blur-sm flex-shrink-0"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
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

            {/* Right side – Enhanced swipe slider */}
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

        {/* Animated glow effect */}
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

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showResponses, setShowResponses] = useState(false);
  const [showFieldViewer, setShowFieldViewer] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [expandedResponses, setExpandedResponses] = useState({});
  const navigate = useNavigate();

  const API_BASE_URL = "https://love-backend-1agq.onrender.com";

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/");
          return;
        }

        const userId = localStorage.getItem("userId");
        // console.log("Fetching forms for userId:", userId);

        const res = await axios.get(`${API_BASE_URL}/user/${userId}/forms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("Forms data:", res.data);
        setForms(res.data.forms);
        setLoading(false);

        // Auto-select first form's fields in desktop view
        if (res.data.forms.length > 0 && window.innerWidth >= 1024) {
          const firstForm = res.data.forms[0];
          setSelectedFormData(firstForm);
          setSelectedForm(firstForm.formId);
          setShowFieldViewer(true);
        }
      } catch (error) {
        console.error("Fetch forms error:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          navigate("/");
        } else {
          setError("Failed to load forms");
          setLoading(false);
        }
      }
    };
    fetchForms();
  }, [navigate]);

  const fetchResponses = async (formId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/form/${formId}/responses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Responses data:", res.data); 
      setResponses(res.data);
      setSelectedForm(formId);
      setShowResponses(true);
      setShowFieldViewer(false);
      // Reset expanded state when fetching new responses
      setExpandedResponses({});
    } catch (error) {
      console.error("Fetch responses error:", error);
      setError("Failed to load responses");
    }
  };

  const viewFormFields = (form) => {
    setSelectedFormData(form);
    setSelectedForm(form.formId);
    setShowFieldViewer(true);
    setShowResponses(false);
  };

  const handleBackToForms = () => {
    setShowResponses(false);
    setShowFieldViewer(false);
    setSelectedForm(null);
    setResponses(null);
    setSelectedFormData(null);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleCreateNew = () => {
    navigate("/");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseCorrectAnswer = (field) => {
    if (!field.correctAnswer) return "";
    try {
      // Remove extra quotes if present
      const parsed = JSON.parse(field.correctAnswer);
      return parsed;
    } catch {
      return field.correctAnswer;
    }
  };

  const getOptionLabel = (option) => {
    return option.label || option;
  };

  // Function to get score color based on percentage
  const getScoreColor = (score) => {
    if (score >= 90) return "from-purple-500 to-pink-500";
    if (score >= 80) return "from-pink-500 to-rose-500";
    if (score >= 70) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 50) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 90)
      return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700";
    if (score >= 80)
      return "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700";
    if (score >= 70)
      return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700";
    if (score >= 60)
      return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700";
    if (score >= 50)
      return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700";
    return "bg-gradient-to-r from-red-100 to-pink-100 text-red-700";
  };

  // Toggle response visibility
  const toggleResponse = (responseIndex) => {
    setExpandedResponses((prev) => ({
      ...prev,
      [responseIndex]: !prev[responseIndex],
    }));
  };

  // Toggle all responses
  const toggleAllResponses = () => {
    if (!responses?.responses) return;

    const allExpanded = responses.responses.every(
      (_, idx) => expandedResponses[idx],
    );

    if (allExpanded) {
      // Collapse all
      setExpandedResponses({});
    } else {
      // Expand all
      const newState = {};
      responses.responses.forEach((_, idx) => {
        newState[idx] = true;
      });
      setExpandedResponses(newState);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600 font-medium">
            Loading your love quizzes...
          </p>
        </div>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen pb-40 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-6 max-w-md w-full border-2 border-pink-100 shadow-2xl shadow-pink-500/20 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-red-100 to-pink-100 p-3 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Confirm Logout
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Are you sure you want to logout?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-3 text-sm font-medium border-2 border-pink-200 text-pink-600 hover:bg-pink-50 rounded-xl transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-red-500/20"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header - Matching Create Section */}
      <div className="bg-gradient-to-r from-white to-pink-50/50 backdrop-blur-sm border-b-2 border-pink-100 shadow-lg shadow-pink-500/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-pink-50/50 px-4 py-2 rounded-2xl border-2 border-pink-100">
                <div className="text-2xl">🎀</div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                  My Love Quizzes
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCreateNew}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/20 transition-all duration-200 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </button>
              <button
                onClick={confirmLogout}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base border-2 border-pink-200 bg-white text-pink-600 hover:bg-pink-50 hover:border-pink-300 rounded-xl transition-all duration-200 active:scale-95"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back Arrow - Only visible on mobile when viewing details */}
      {(showResponses || showFieldViewer) && (
        <div className="lg:hidden mt-3">
          <button
            onClick={handleBackToForms}
            className="flex items-center gap-2 px-3 py-2 hover:bg-pink-50 rounded-xl transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-pink-600" />
            <span className="text-sm text-pink-600 font-medium">
              Back to Forms
            </span>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {error && (
          <div className="bg-gradient-to-r from-red-50/50 to-rose-50/50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        )}

        {copySuccess && (
          <div className="fixed top-20 right-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl shadow-lg animate-fade-in-down z-50">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Copied to clipboard!</span>
            </div>
          </div>
        )}

        {/* Stats Cards - Hidden on mobile when viewing details */}
        <div
          className={`grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 ${showResponses || showFieldViewer ? "hidden lg:grid" : "grid"}`}
        >
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 sm:p-6 border-2 border-pink-100 shadow-lg shadow-pink-500/5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              <p className="text-xs sm:text-sm font-semibold text-emerald-600">
                Published
              </p>
            </div>
            <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              {forms.filter((f) => f.status === "PUBLISHED").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 sm:p-6 border-2 border-pink-100 shadow-lg shadow-pink-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <p className="text-xs sm:text-sm font-semibold text-purple-600">
                Responses
              </p>
            </div>
            <p className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {forms.reduce((sum, form) => sum + form.responseCount, 0)}
            </p>
          </div>
        </div>

        {/* Mobile Create Button - Hidden when viewing details */}
        <button
          onClick={handleCreateNew}
          className={`sm:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/20 transition-all duration-200 active:scale-95 mb-6 ${showResponses || showFieldViewer ? "hidden" : "flex"}`}
        >
          <Plus className="w-5 h-5" />
          <span>Create New Quiz</span>
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Forms List */}
          <div
            className={`${showResponses || showFieldViewer ? "hidden lg:block" : "block"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Your Forms
              </h2>
            </div>

            {forms.length === 0 ? (
              <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-8 sm:p-12 text-center border-2 border-pink-100 shadow-lg shadow-pink-500/5">
                <Heart className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                <p className="text-base sm:text-lg text-pink-400 font-medium mb-4">
                  No love quizzes yet
                </p>
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/20 transition-all duration-200 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {forms.map((form) => (
                  <div
                    key={form.formId}
                    className={`bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 shadow-lg ${
                      selectedForm === form.formId
                        ? "border-pink-400 shadow-pink-500/20 scale-[1.02]"
                        : "border-pink-100 shadow-pink-500/5 hover:border-pink-200 hover:shadow-pink-500/10"
                    }`}
                  >
                    {/* Form Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-5 h-5 text-pink-500 fill-pink-500 flex-shrink-0" />
                          <h3 className="font-bold text-base sm:text-lg bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent truncate">
                            {form.yourName} & {form.yourSpouseName}
                          </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="flex items-center gap-1.5 text-pink-600">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">
                              {form.responseCount} responses
                            </span>
                          </span>
                          <span className="flex items-center gap-1.5 text-pink-500">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{formatDate(form.createdAt)}</span>
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm ${
                          form.status === "PUBLISHED"
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                        }`}
                      >
                        {form.status === "PUBLISHED"
                          ? "✓ Published"
                          : form.status}
                      </span>
                    </div>

                    {/* Reveal Text Preview */}
                    {form.revealText && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100 rounded-xl">
                        <p className="text-xs text-purple-600 font-semibold mb-1">
                          Reveal Message:
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {form.revealText}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => viewFormFields(form)}
                        className="flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-2.5 text-xs sm:text-sm bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 hover:from-pink-200 hover:to-rose-200 rounded-xl transition-all duration-200 active:scale-95 font-medium shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => fetchResponses(form.formId)}
                        className="flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-2.5 text-xs sm:text-sm bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-200 hover:to-cyan-200 rounded-xl transition-all duration-200 active:scale-95 font-medium shadow-sm"
                      >
                        <Users className="w-4 h-4" />
                        <span>Responses</span>
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `${window.location.origin}/form/${form.formId}`,
                          )
                        }
                        className="flex flex-col sm:flex-row items-center justify-center gap-1 px-3 py-2.5 text-xs sm:text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 rounded-xl transition-all duration-200 active:scale-95 font-medium shadow-sm"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Field Viewer Panel */}
          {showFieldViewer && selectedFormData && (
            <div
              className={`${!showFieldViewer ? "hidden lg:block" : "block"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Questions & Answers
                </h2>
              </div>

              {/* Form Info Card */}
              <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-5 border-2 border-pink-100 shadow-lg shadow-pink-500/5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                  <h3 className="font-bold text-lg bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {selectedFormData.yourName} &{" "}
                    {selectedFormData.yourSpouseName}
                  </h3>
                </div>

                {selectedFormData.revealText && (
                  <div className="p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100 rounded-xl mb-3">
                    <p className="text-xs text-purple-600 font-semibold mb-1">
                      💕 Reveal Message
                    </p>
                    <p className="text-sm text-gray-700">
                      {selectedFormData.revealText}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-pink-100">
                  <span className="text-xs text-pink-600 font-medium">
                    {selectedFormData.fields.length} Questions
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/form/${selectedFormData.formId}`,
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 active:scale-95 font-medium shadow-sm"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-3 sm:space-y-4">
                {!selectedFormData.fields ||
                selectedFormData.fields.length === 0 ? (
                  <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-8 text-center border-2 border-pink-100 shadow-lg shadow-pink-500/5">
                    <p className="text-sm text-pink-400">
                      No questions in this form
                    </p>
                  </div>
                ) : (
                  selectedFormData.fields.map((field, index) => (
                    <div
                      key={field.fieldId}
                      className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 sm:p-5 border-2 border-pink-100 shadow-lg shadow-pink-500/5"
                    >
                      {/* Field Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            Q{index + 1}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg text-xs font-semibold">
                            {field.type === "SELECT" ? (
                              <>
                                <List className="w-3 h-3" />
                                <span>Multiple Choice</span>
                              </>
                            ) : (
                              <>
                                <TextCursor className="w-3 h-3" />
                                <span>Text Answer</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Question Label */}
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-pink-600 mb-2 flex items-center gap-1.5">
                          <span>❓</span>
                          Question
                        </label>
                        <div className="w-full px-4 py-3 text-sm bg-white border-2 border-pink-100 rounded-xl text-gray-800 font-medium shadow-sm">
                          {field.label}
                        </div>
                      </div>

                      {/* Options (for SELECT type) */}
                      {field.type === "SELECT" &&
                        field.options &&
                        field.options.length > 0 && (
                          <div className="mb-3">
                            <label className="block text-xs font-semibold text-pink-600 mb-2 flex items-center gap-1.5">
                              <List className="w-3.5 h-3.5" />
                              Answer Options
                            </label>
                            <div className="space-y-2">
                              {field.options.map((option, idx) => {
                                const optionLabel = getOptionLabel(option);
                                const correctAnswer = parseCorrectAnswer(field);
                                const isCorrect = optionLabel === correctAnswer;

                                return (
                                  <div
                                    key={option.optionId || idx}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm rounded-xl border-2 transition-all ${
                                      isCorrect
                                        ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 text-emerald-800 font-medium shadow-sm"
                                        : "bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border-blue-100 text-gray-700"
                                    }`}
                                  >
                                    {isCorrect ? (
                                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                      <Radio className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    )}
                                    <span className="flex-1">
                                      {optionLabel}
                                    </span>
                                    {isCorrect && (
                                      <span className="text-xs bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                                        ✓ Correct
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      {/* Correct Answer (for TEXT type) */}
                      {field.type === "TEXT" && (
                        <div>
                          <label className="block text-xs font-semibold text-pink-600 mb-2 flex items-center gap-1.5">
                            <TextCursor className="w-3.5 h-3.5" />
                            Expected Answer
                          </label>
                          <div className="w-full px-4 py-3 text-sm bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-gray-800 shadow-sm">
                            {parseCorrectAnswer(field) || (
                              <span className="text-gray-400 italic">
                                Any text answer accepted
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Responses Panel */}
          {showResponses && responses && (
            <div className={`${!showResponses ? "hidden lg:block" : "block"}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Quiz Responses ({responses.totalResponses || 0})
                </h2>
                {responses.responses && responses.responses.length > 1 && (
                  <button
                    onClick={toggleAllResponses}
                    className="text-xs px-3 py-1.5 border-2 border-pink-200 text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 active:scale-95"
                  >
                    {responses.responses.every(
                      (_, idx) => expandedResponses[idx],
                    )
                      ? "Collapse All"
                      : "Expand All"}
                  </button>
                )}
              </div>

              {!responses.responses || responses.responses.length === 0 ? (
                <div className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-8 sm:p-12 text-center border-2 border-pink-100 shadow-lg shadow-pink-500/5">
                  <Users className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                  <p className="text-base text-pink-400 font-medium mb-2">
                    No responses yet
                  </p>
                  <p className="text-sm text-pink-300">
                    Share your quiz to get responses!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {responses.responses.map((response, responseIndex) => (
                    <div
                      key={response.attempt || responseIndex}
                      className="bg-gradient-to-br from-white to-pink-50/30 rounded-2xl p-4 sm:p-5 border-2 border-pink-100 shadow-lg shadow-pink-500/5"
                    >
                      {/* Response Header - Toggle Button */}
                      <button
                        onClick={() => toggleResponse(responseIndex)}
                        className="w-full flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-pink-100 hover:bg-pink-50/50 rounded-lg p-2 -m-2 transition-all duration-200"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left">
                          <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm w-fit">
                           Attempt #{responses.responses.length - responseIndex}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-pink-500 font-medium hidden sm:block">
                            {formatDate(response.submittedAt)}
                          </span>
                          {expandedResponses[responseIndex] ? (
                            <><span className="text-pink-500">Close</span><ChevronUp className="w-5 h-5 text-pink-500" /></>
                          ) : (
                            <><span className="text-pink-500">Open</span><ChevronDown className="w-5 h-5 text-pink-500" /></>
                          )}
                        </div>
                      </button>

                      {/* Date for mobile */}
                      <div className="sm:hidden text-[11px] text-pink-500 font-medium mb-3 px-2">
                        Submitted on {formatDate(response.submittedAt)}
                      </div>

                      {/* Score Circle */}
                      <div className="flex justify-center mb-6">
                        <div className="relative w-24 h-24">
                          {/* Glow */}
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreColor(
                              response.score,
                            )} opacity-20 blur-sm`}
                          />

                          {/* Inner Circle */}
                          <div onClick={() => toggleResponse(responseIndex)} className="absolute inset-[6px] rounded-full bg-white/90 backdrop-blur flex flex-col items-center justify-center shadow-sm">
                            {/* Score */}
                            <div
                              className={`text-xl font-semibold bg-gradient-to-r ${getScoreColor(
                                response.score,
                              )} bg-clip-text text-transparent leading-none`}
                            >
                              <div className="flex items-center">
                                <Award className="w-4 h-4 text-pink-500 mb-0.5" />
                                {response.score}%
                              </div>
                            </div>

                            {/* Label */}
                            <div className="text-[9px] uppercase tracking-widest text-gray-400 mt-0.5">
                              Score
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Answers */}
                      <div
                        className={`space-y-4 transition-all duration-500 ease-in-out ${
                          expandedResponses[responseIndex]
                            ? "max-h-[3000px] opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        {response.answers?.map((answer, idx) => (
                          <div
                            key={idx}
                            className="rounded-2xl bg-white/70 backdrop-blur border border-gray-100 shadow-sm p-4"
                          >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-xs font-semibold text-pink-600 flex gap-1">
                                  <span>Q{idx + 1}.</span>
                                  <span className="text-gray-700 font-medium">
                                    {answer.question}
                                  </span>
                                </p>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                  {answer.type === "SELECT"
                                    ? "Multiple Choice"
                                    : "Text Answer"}
                                </p>
                              </div>

                              <span
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold ${
                                  answer.isCorrect
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-red-50 text-red-600"
                                }`}
                              >
                                {answer.isCorrect ? (
                                  <>
                                    <Check className="w-3 h-3" /> Correct
                                  </>
                                ) : (
                                  <>
                                    <X className="w-3 h-3" /> Wrong
                                  </>
                                )}
                              </span>
                            </div>

                            {/* User Answer */}
                            <div className="mb-3">
                              <p className="text-[11px] font-medium text-gray-500 mb-1">
                                User's Answer
                              </p>
                              <div className="rounded-xl bg-blue-50/40 border border-blue-100 px-3 py-2">
                                <p className="text-sm text-gray-800">
                                  {answer.userAnswer || "No answer"}
                                </p>
                              </div>
                            </div>

                            {/* Expected Answer */}
                            <div>
                              <p className="text-[11px] font-medium text-gray-500 mb-1">
                                Expected Answer
                              </p>
                              <div
                                className={`rounded-xl px-3 py-2 border ${
                                  answer.isCorrect
                                    ? "bg-emerald-50/40 border-emerald-200"
                                    : "bg-red-50 border-red-300"
                                }`}
                              >
                                <p className="text-sm text-gray-800">
                                  {answer.expectedAnswer ||
                                    "Any answer accepted"}
                                </p>
                              </div>
                            </div>

                            {/* Similarity */}
                            {answer.type === "TEXT" &&
                              answer.similarity !== undefined && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                                    <span>Similarity</span>
                                    <span className="font-semibold text-pink-600">
                                      {Math.round(answer.similarity * 100)}%
                                    </span>
                                  </div>
                                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                                      style={{
                                        width: `${answer.similarity * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>

                      {/* Toggle Hint Text - Shows when collapsed */}
                      {!expandedResponses[responseIndex] && (
                        <div className="text-center pt-2">
                          <p className="text-xs text-pink-400">
                            Click the header to view{" "}
                            {response.answers?.length || 0} question answers
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
 <SwipeToUnlockCareer />
    </div>
  );
}
