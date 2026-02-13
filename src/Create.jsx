import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import { motion } from "framer-motion";
import love from "../src/assets/love-message.png";
import {
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquare,
  Sparkles,
  Share2,
  Copy,
  Eye,
  FileText,
  X,
  Edit2,
  Save,
  AlertCircle,
  CheckCircle,
  Radio,
  TextCursor,
  List,
  Type,
  Heart,
  User,
  Image as ImageIcon,
  Gift,
  Circle,
  Mail,
  Lock,
  Key,
  RefreshCw,
  Home,
  LogOut,
  Briefcase,
} from "lucide-react";

// Inline shadcn/ui components
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

const Input = React.forwardRef(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-11 w-full rounded-xl border-2 border-pink-100 bg-white px-3 py-2.5 text-sm md:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:border-pink-300 ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-xl border-2 border-pink-100 bg-white px-3 py-2.5 text-sm md:text-base ring-offset-background placeholder:text-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-200 focus:border-pink-300 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

const Card = React.forwardRef(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-gradient-to-br from-white to-pink-50/30 border-2 border-pink-100 shadow-lg shadow-pink-500/5",
      secondary:
        "bg-gradient-to-br from-purple-50/50 to-pink-50/50 border-2 border-purple-100 shadow-lg shadow-purple-500/5",
      outline: "border-2 border-pink-200 bg-white",
    };

    return (
      <div
        ref={ref}
        className={`rounded-2xl ${variants[variant]} ${className}`}
        {...props}
      />
    );
  },
);

const CardHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 p-4 md:p-6 ${className}`}
    {...props}
  />
);

const CardTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent ${className}`}
    {...props}
  />
));

const CardDescription = ({ className = "", ...props }) => (
  <p
    className={`text-sm md:text-base text-pink-500/80 ${className}`}
    {...props}
  />
);

const CardContent = ({ className = "", ...props }) => (
  <div className={`p-4 md:p-6 pt-0 ${className}`} {...props} />
);

const CardFooter = ({ className = "", ...props }) => (
  <div
    className={`flex items-center p-4 md:p-6 pt-0 ${className}`}
    {...props}
  />
);

const Label = React.forwardRef(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={`text-xs md:text-sm font-semibold text-pink-600 flex items-center gap-1.5 ${className}`}
    {...props}
  />
));

const Progress = ({ value = 0, className = "", ...props }) => (
  <div
    className={`relative h-2 w-full overflow-hidden rounded-full bg-pink-100 ${className}`}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);

const Badge = React.forwardRef(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const variants = {
      default:
        "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30",
      secondary: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600",
      outline: "border border-pink-200 text-pink-600",
      success:
        "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600",
      warning: "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-600",
      info: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600",
      draft: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-600",
      published:
        "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600",
      login:"py-2 rounded-md bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600 border border-2 border-green-200"  
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

const Tabs = React.forwardRef(
  (
    { defaultValue, value, onValueChange, children, className = "", ...props },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useState(value || defaultValue || "");

    useEffect(() => {
      if (value !== undefined) {
        setActiveTab(value);
      }
    }, [value]);

    const handleTabChange = (newValue) => {
      setActiveTab(newValue);
      onValueChange?.(newValue);
    };

    return (
      <div ref={ref} className={className} {...props}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            activeTab,
            onTabChange: handleTabChange,
          }),
        )}
      </div>
    );
  },
);

const TabsList = React.forwardRef(
  ({ children, className = "", activeTab, onTabChange, ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-pink-50/50 to-rose-50/50 p-0.5 w-full ${className}`}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, onTabChange }),
      )}
    </div>
  ),
);

const TabsTrigger = React.forwardRef(
  (
    { value, children, className = "", activeTab, onTabChange, ...props },
    ref,
  ) => {
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        onClick={() => onTabChange?.(value)}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs md:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex-1 ${isActive ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow shadow-pink-500/30" : "text-pink-600 hover:text-pink-700"} ${className}`}
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

const Dialog = React.forwardRef(
  ({ open, onOpenChange, children, ...props }, ref) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { onOpenChange }),
        )}
      </div>
    );
  },
);

const DialogContent = React.forwardRef(
  ({ children, className = "", onOpenChange, ...props }, ref) => (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        ref={ref}
        className={`bg-gradient-to-br from-white to-pink-50/30 rounded-2xl border-2 border-pink-100 p-4 md:p-6 shadow-2xl shadow-pink-500/10 backdrop-blur-sm w-full max-w-sm md:max-w-md mx-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  ),
);

const DialogHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
);

const DialogTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-lg md:text-xl font-bold text-gray-800 ${className}`}
    {...props}
  />
));

const DialogDescription = React.forwardRef(
  ({ className = "", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm md:text-base text-gray-600 ${className}`}
      {...props}
    />
  ),
);

const DialogFooter = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 mt-4 md:mt-6 ${className}`}
    {...props}
  />
);

// Main Form Builder Component
function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    message: "",
    type: "info",
  });
  const [publishedFormId, setPublishedFormId] = useState(null);

  // Auth state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authStep, setAuthStep] = useState("email"); // 'email' or 'otp'
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [authError, setAuthError] = useState(""); // Error message for auth modal
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  const [isDirectLogin, setIsDirectLogin] = useState(false); // Track if login from header

  // User details state
  const [userDetails, setUserDetails] = useState({
    yourName: "",
    yourSpouseName: "",
  });

  // Fields state (5 fields) - ALL fields start as SELECT with 2-4 options and imageFile
  const [fields, setFields] = useState([
    {
      id: 1,
      label: "",
      type: "SELECT",
      order: 1,
      options: ["", ""],
      correctAnswer: "",
      imageFile: null,
    },
    {
      id: 2,
      label: "",
      type: "SELECT",
      order: 2,
      options: ["", ""],
      correctAnswer: "",
      imageFile: null,
    },
    {
      id: 3,
      label: "",
      type: "SELECT",
      order: 3,
      options: ["", ""],
      correctAnswer: "",
      imageFile: null,
    },
    {
      id: 4,
      label: "",
      type: "SELECT",
      order: 4,
      options: ["", ""],
      correctAnswer: "",
      imageFile: null,
    },
    {
      id: 5,
      label: "",
      type: "SELECT",
      order: 5,
      options: ["", ""],
      correctAnswer: "",
      imageFile: null,
    },
  ]);

  // Reveal step state
  const [reveal, setReveal] = useState({
    revealText: "",
    revealImageFile: null,
  });

  const [currentField, setCurrentField] = useState(0); // 0-4 index

  // Set Authorization header when accessToken changes
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  // Resend OTP timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const showMessage = (title, message, type = "info") => {
    setDialogContent({ title, message, type });
    setShowDialog(true);
  };

  // Field placeholders with user names
  const getFieldPlaceholder = (index) => {
    const { yourName, yourSpouseName } = userDetails;
    const you = yourName || "You";
    const spouse = yourSpouseName || "Your Spouse";

    const placeholders = [
      `Where did ${you} and ${spouse} first meet?`,
      `Who fell in love first, ${you} or ${spouse}?`,
      `Who said "I love you" first?`,
      `What's the most special memory of ${spouse}?`,
      `Where would ${you} and ${spouse} like to go on a dream vacation?`,
    ];

    return placeholders[index] || `Question ${index + 1}`;
  };

  // Default options for SELECT fields
  const getDefaultOptions = (index) => {
    const { yourName, yourSpouseName } = userDetails;
    const you = yourName || "You";
    const spouse = yourSpouseName || "Your Spouse";

    const defaultOptions = [
      [
        `At a coffee shop ☕`,
        `Through mutual friends 👥`,
        `At work 💼`,
        `Online 💻`,
      ],
      [
        `${you} 💕`,
        `${spouse} ❤️`,
        `Both at the same time 💘`,
        `It was love at first sight 💘`,
      ],
      [
        `${you} said it first 😊`,
        `${spouse} said it first 💖`,
        `We said it together 💞`,
        `We never had to say it, we just knew 💕`,
      ],
      [
        `Their smile 😊`,
        `Their kindness 💝`,
        `The way they care for me 💕`,
        `Everything about them 💖`,
      ],
      [`Paris 🇫🇷`, `Maldives 🏝️`, `Japan 🇯🇵`, `Switzerland 🏔️`],
    ];

    return (
      defaultOptions[index] || ["Option 1", "Option 2", "Option 3", "Option 4"]
    );
  };

  // Update current field label
  const updateFieldLabel = (value) => {
    const newFields = [...fields];
    newFields[currentField].label = value;
    setFields(newFields);
  };

  // Update field option for SELECT type
  const updateFieldOption = (optionIndex, value) => {
    const newFields = [...fields];
    newFields[currentField].options[optionIndex] = value;
    setFields(newFields);
  };

  // Remove a field option (must have at least 2 options)
  const removeFieldOption = (optionIndex) => {
    const newFields = [...fields];
    if (newFields[currentField].options.length > 2) {
      const removedOption = newFields[currentField].options[optionIndex];
      newFields[currentField].options = newFields[currentField].options.filter(
        (_, i) => i !== optionIndex,
      );

      // If the removed option was the correct answer, clear the correct answer
      if (newFields[currentField].correctAnswer === removedOption) {
        newFields[currentField].correctAnswer = "";
      }
      setFields(newFields);
    } else {
      showMessage(
        "Minimum Options",
        "SELECT fields must have at least 2 options",
        "error",
      );
    }
  };

  // Add a field option (max 4 options)
  const addFieldOption = () => {
    const newFields = [...fields];
    if (newFields[currentField].options.length < 4) {
      newFields[currentField].options.push("");
      setFields(newFields);
    } else {
      showMessage(
        "Maximum Options",
        "Maximum 4 options allowed for SELECT fields",
        "error",
      );
    }
  };

  // Change field type between SELECT and TEXT
  const changeFieldType = (type) => {
    const newFields = [...fields];
    const currentFieldData = newFields[currentField];

    if (type === "SELECT" && currentFieldData.type !== "SELECT") {
      currentFieldData.type = "SELECT";
      currentFieldData.options = ["", ""];
      currentFieldData.correctAnswer = "";
    } else if (type === "TEXT" && currentFieldData.type !== "TEXT") {
      currentFieldData.type = "TEXT";
      currentFieldData.options = [];
      currentFieldData.correctAnswer = "";
    }

    setFields(newFields);
  };

  // Set correct answer for SELECT field - allow unselect by clicking same option
  const setCorrectAnswer = (answer) => {
    const newFields = [...fields];
    const cleanAnswer = answer.replace(/^["']|["']$/g, "").trim();

    // If clicking the same answer that's already selected, unselect it
    if (newFields[currentField].correctAnswer === cleanAnswer) {
      newFields[currentField].correctAnswer = "";
    } else {
      // Otherwise, select the new answer
      newFields[currentField].correctAnswer = cleanAnswer;
    }

    setFields(newFields);
  };

  // Set expected answer for TEXT field
  const setExpectedAnswer = (answer) => {
    const newFields = [...fields];
    newFields[currentField].correctAnswer = answer;
    setFields(newFields);
  };

  // Handle question image upload
  const handleQuestionImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFields = [...fields];
      newFields[currentField].imageFile = file;
      setFields(newFields);
    }
  };

  // Remove question image
  const removeQuestionImage = () => {
    const newFields = [...fields];
    newFields[currentField].imageFile = null;
    setFields(newFields);
  };

  // Go to next field
  const goToNextField = () => {
    const field = fields[currentField];

    if (!field.label.trim()) {
      showMessage(
        "Missing Question",
        `Please enter a question for field ${currentField + 1}`,
        "error",
      );
      return;
    }

    if (field.type === "SELECT") {
      const filledOptions = field.options.filter((opt) => opt.trim());
      if (filledOptions.length < 2) {
        showMessage(
          "Not Enough Options",
          `Please fill in at least 2 options for this question`,
          "error",
        );
        return;
      }

      if (!field.correctAnswer.trim()) {
        showMessage(
          "Missing Correct Answer",
          `Please select the correct answer for this question`,
          "error",
        );
        return;
      }
    }

    if (currentField < 4) {
      setCurrentField(currentField + 1);
    } else {
      setStep(3);
    }
  };

  // Go to previous field
  const goToPrevField = () => {
    if (currentField > 0) {
      setCurrentField(currentField - 1);
    } else {
      setStep(1);
    }
  };

  // Jump to specific field
  const goToField = (index) => {
    setCurrentField(index);
  };

  // Handle reveal image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReveal({ ...reveal, revealImageFile: file });
    }
  };

  // STEP 1: Move to questions
  const handleStartQuestions = () => {
    if (!userDetails.yourName.trim() || !userDetails.yourSpouseName.trim()) {
      showMessage("Missing Information", "Please enter both names", "error");
      return;
    }
    setStep(2);
  };

  // STEP 2 to STEP 3: Validate and move to reveal
  const handleMoveToReveal = () => {
    // Validate all fields
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!field.label.trim()) {
        showMessage(
          "Missing Question",
          `Please enter a question for field ${i + 1}`,
          "error",
        );
        goToField(i);
        setStep(2);
        return;
      }

      if (field.type === "SELECT") {
        const filledOptions = field.options.filter((opt) => opt.trim());
        if (filledOptions.length < 2) {
          showMessage(
            "Not Enough Options",
            `Field ${i + 1}: Please fill in at least 2 options`,
            "error",
          );
          goToField(i);
          setStep(2);
          return;
        }

        if (!field.correctAnswer.trim()) {
          showMessage(
            "Missing Correct Answer",
            `Field ${i + 1}: Please select the correct answer`,
            "error",
          );
          goToField(i);
          setStep(2);
          return;
        }
      }
    }
    setStep(3);
  };

  // Auth Functions - Unified Login Flow (with OTP)
  const handleSendLoginOTP = async () => {
    if (!email.trim()) {
      setAuthError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setAuthError("Please enter a valid email address");
      return;
    }

    setAuthLoading(true);
    setAuthError("");
    try {
      const response = await axios.post(
        `/auth/login`,
        { email: email.trim() },
        { withCredentials: true },
      );

      if (response.data) {
        setAuthStep("otp");
        setCanResend(false);
        setResendTimer(30);
        showMessage(
          "OTP Sent",
          response.data.message || "Check your email for the verification code",
          "success",
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to send OTP. Please try again.";
      setAuthError(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  // Auth Functions - FOR PUBLISH FLOW (Signup with OTP)
  const handleSendSignupOTP = async () => {
    if (!email.trim()) {
      setAuthError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setAuthError("Please enter a valid email address");
      return;
    }

    setAuthLoading(true);
    setAuthError("");
    try {
      const response = await axios.post(
        `/auth/signup`,
        { email: email.trim() },
        { withCredentials: true },
      );

      setAuthStep("otp");
      setCanResend(false);
      setResendTimer(30);

      const successMessage =
        response.data?.message || "Check your email for the verification code";
      showMessage("OTP Sent", successMessage, "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to send OTP. Please try again.";
      setAuthError(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email.trim() || resendLoading || !canResend) return;

    setResendLoading(true);
    setAuthError("");
    try {
      // Use login endpoint for resend (same as login page)
      const response = await axios.post(
        `/auth/resend-otp`,
        { email: email.trim() },
        { withCredentials: true },
      );

      setCanResend(false);
      setResendTimer(30);

      const successMessage =
        response.data?.message || "New verification code sent to your email";
      showMessage("OTP Resent", successMessage, "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to resend OTP. Please try again.";
      setAuthError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!code.trim() || code.length !== 6) {
      setAuthError("Please enter a valid 6-digit code");
      return;
    }

    setAuthLoading(true);
    setAuthError("");
    try {
      const verifyResponse = await axios.post(
        `/auth/verify-otp`,
        { email: email.trim(), code: code.trim() },
        { withCredentials: true },
      );

      const {
        accessToken: newAccessToken,
        message,
        userId,
        role,
      } = verifyResponse.data;

      if (!newAccessToken) {
        throw new Error("No access token received from server");
      }

      // Store token, userId, and role in localStorage
      localStorage.setItem("accessToken", newAccessToken);
      if (userId) {
        localStorage.setItem("userId", userId);
      }
      if (role) {
        localStorage.setItem("userRole", role);
      }

      setAccessToken(newAccessToken);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${newAccessToken}`;

      setShowAuthModal(false);
      setAuthError("");

      const successMessage = message || "You are now logged in!";
      showMessage("Login Successful", successMessage, "success");

      if (isDirectLogin) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        await handlePublishAllWithToken(newAccessToken);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid OTP code. Please try again.";
      setAuthError(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      // Clear all auth data
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      delete axios.defaults.headers.common["Authorization"];

      showMessage(
        "Logged Out",
        "You have been logged out successfully",
        "success",
      );
    } catch (error) {
      // Even if logout fails on server, clear local auth
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      delete axios.defaults.headers.common["Authorization"];

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Logged out locally";

      showMessage("Logout", errorMessage, "info");
    }
  };

  // Open auth modal - detect if direct login or publish flow
  const openAuthModal = (isDirect = false) => {
    setIsDirectLogin(isDirect);
    setAuthMode(isDirect ? "login" : "signup");
    setAuthStep("email");
    setEmail("");
    setCode("");
    setAuthError("");
    setShowAuthModal(true);
  };

  // FINAL STEP: Create, Save, and Publish everything (with token parameter)
  const handlePublishAllWithToken = async (token = accessToken) => {
    if (!reveal.revealText.trim()) {
      showMessage(
        "Missing Reveal Text",
        "Please enter a reveal message for your quiz",
        "error",
      );
      return;
    }

    if (!token) {
      showMessage(
        "Authentication Required",
        "Please log in to publish your quiz",
        "info",
      );
      openAuthModal(false);
      return;
    }

    setLoading(true);
    try {
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");

      // Step 1: Create form
      const formData = {
        yourName: userDetails.yourName.trim(),
        yourSpouseName: userDetails.yourSpouseName.trim(),
      };

      // Add userId if available
      if (userId) {
        formData.userId = userId;
      }

      const createResponse = await axios.post(`/form`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (!createResponse.data?.form?.formId) {
        throw new Error("No form ID received from server");
      }

      const createdForm = createResponse.data.form;

      // Step 2: Save all fields with images using FormData
      const fieldsFormData = new FormData();

      // Add fields data as JSON string
      const fieldsData = fields.map((field) => ({
        label: field.label.trim(),
        type: field.type,
        order: field.order,
        options:
          field.type === "SELECT"
            ? field.options.filter((opt) => opt.trim()).map((opt) => opt.trim())
            : undefined,
        correctAnswer: field.correctAnswer.trim(),
      }));

      fieldsFormData.append("fields", JSON.stringify(fieldsData));

      // Add image files separately
      fields.forEach((field, index) => {
        if (field.imageFile) {
          fieldsFormData.append(`fieldImage_${index}`, field.imageFile);
        }
      });

      await axios.post(`/form/${createdForm.formId}/fields`, fieldsFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Step 3: Save reveal data with image using FormData
      const revealFormData = new FormData();
      revealFormData.append("revealText", reveal.revealText.trim());

      if (reveal.revealImageFile) {
        revealFormData.append("revealImage", reveal.revealImageFile);
      }

      await axios.put(`/form/${createdForm.formId}/reveal`, revealFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Success - store form ID and show success message
      setPublishedFormId(createdForm.formId);

      showMessage(
        "Quiz Published Successfully! 💕",
        `Your love quiz has been created and is ready to share with ${userDetails.yourSpouseName}!`,
        "success",
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 401) {
        showMessage(
          "Session Expired",
          "Your session has expired. Please log in again to continue.",
          "error",
        );
        handleLogout();
        openAuthModal(false);
      } else if (error.response?.status === 404) {
        const errorMessage =
          error.response?.data?.message ||
          "API endpoint not found. Please contact support.";
        showMessage("Endpoint Not Found", errorMessage, "error");
      } else if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Invalid data provided. Please check your inputs.";
        showMessage("Invalid Data", errorMessage, "error");
      } else if (error.response?.status === 500) {
        const errorMessage =
          error.response?.data?.message ||
          "Server error occurred. Please try again later.";
        showMessage("Server Error", errorMessage, "error");
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to publish quiz. Please try again.";
        showMessage("Publish Error", errorMessage, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Wrapper for handlePublishAllWithToken that uses current accessToken
  const handlePublishAll = () => {
    handlePublishAllWithToken(accessToken);
  };

  // Get current step title
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Your Love Story";
      case 2:
        return "Create Questions";
      case 3:
        return "Final Reveal";
      default:
        return "";
    }
  };

  // Get total steps for progress
  const getTotalSteps = () => {
    return 3;
  };

  // Get placeholder for SELECT field options based on field index
  const getOptionPlaceholder = (fieldIndex, optionIndex) => {
    const defaultOptions = getDefaultOptions(fieldIndex);
    return (
      defaultOptions[optionIndex] ||
      `Option ${String.fromCharCode(65 + optionIndex)}`
    );
  };

  // Reset and create new quiz
  const handleCreateNew = () => {
    setStep(1);
    setPublishedFormId(null);
    setUserDetails({ yourName: "", yourSpouseName: "" });
    setFields([
      {
        id: 1,
        label: "",
        type: "SELECT",
        order: 1,
        options: ["", ""],
        correctAnswer: "",
        imageFile: null,
      },
      {
        id: 2,
        label: "",
        type: "SELECT",
        order: 2,
        options: ["", ""],
        correctAnswer: "",
        imageFile: null,
      },
      {
        id: 3,
        label: "",
        type: "SELECT",
        order: 3,
        options: ["", ""],
        correctAnswer: "",
        imageFile: null,
      },
      {
        id: 4,
        label: "",
        type: "SELECT",
        order: 4,
        options: ["", ""],
        correctAnswer: "",
        imageFile: null,
      },
      {
        id: 5,
        label: "",
        type: "SELECT",
        order: 5,
        options: ["", ""],
        correctAnswer: "",
        imageFile: null,
      },
    ]);
    setReveal({ revealText: "", revealImageFile: null });
    setCurrentField(0);
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const totalSteps = 3;
  const progressPercent = step > 1 ? ((step - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="min-h-screen md:pb-36 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-3 md:p-6">
      {/* Main Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {dialogContent.type === "error" ? (
                <div className="p-1.5 rounded-full bg-gradient-to-r from-red-100 to-rose-100">
                  <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                </div>
              ) : dialogContent.type === "success" ? (
                <div className="p-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                </div>
              ) : (
                <div className="p-1.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100">
                  <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                </div>
              )}
              <DialogTitle className="text-base md:text-lg">
                {dialogContent.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs md:text-sm">
              {dialogContent.message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {dialogContent.type === "success" && publishedFormId ? (
              <Button onClick={goToDashboard} className="w-full text-sm gap-2">
                <Home className="h-4 w-4" />
                Go to Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => setShowDialog(false)}
                className="w-full text-sm"
              >
                OK
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Authentication Modal - Unified for Login & Signup */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-1.5 rounded-full bg-gradient-to-r from-pink-100 to-rose-100">
                <Lock className="h-5 w-5 md:h-6 md:w-6 text-pink-500" />
              </div>
              <DialogTitle className="text-base md:text-xl text-center">
                {authStep === "email"
                  ? isDirectLogin
                    ? "Login to Dashboard"
                    : "Login / Sign Up"
                  : "Verify OTP"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-center">
              {authStep === "email"
                ? isDirectLogin
                  ? "Enter your email to receive a login code"
                  : "Enter your email to receive a verification code"
                : `Enter the 6-digit code sent to ${email}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Error Message Display */}
            {authError && (
              <Alert variant="destructive">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <AlertTitle className="text-xs">Error</AlertTitle>
                    <AlertDescription className="text-xs">
                      {authError}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}

            {authStep === "email" ? (
              <div className="space-y-2">
                <Label>
                  <Mail className="h-3.5 w-3.5" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAuthError("");
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      if (isDirectLogin) {
                        handleSendLoginOTP();
                      } else {
                        handleSendSignupOTP();
                      }
                    }
                  }}
                  disabled={authLoading}
                  className="text-center"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    <Key className="h-3.5 w-3.5" />
                    OTP Code (6 digits)
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, ""));
                      setAuthError("");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && code.length === 6) {
                        handleVerifyOTP();
                      }
                    }}
                    disabled={authLoading}
                    className="text-center text-xl tracking-widest font-mono"
                  />
                  <p className="text-xs text-pink-500 text-center">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                <div className="text-center">
                  {canResend ? (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleResendOTP}
                      disabled={resendLoading}
                      className="gap-1"
                    >
                      <RefreshCw
                        className={`h-3 w-3 ${resendLoading ? "animate-spin" : ""}`}
                      />
                      {resendLoading ? "Resending..." : "Resend OTP"}
                    </Button>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Resend OTP in {resendTimer} seconds
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {authStep === "otp" && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setAuthStep("email");
                    setCode("");
                    setAuthError("");
                  }}
                  className="flex-1"
                  disabled={authLoading}
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  Back
                </Button>
              )}
              <Button
                onClick={
                  authStep === "email"
                    ? isDirectLogin
                      ? handleSendLoginOTP
                      : handleSendSignupOTP
                    : handleVerifyOTP
                }
                disabled={
                  authLoading || (authStep === "otp" && code.length !== 6)
                }
                className="flex-1"
              >
                {authLoading ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent mr-1" />
                    {authStep === "email" ? "Sending..." : "Verifying..."}
                  </>
                ) : (
                  <>
                    {authStep === "email" ? (
                      <>
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        Send OTP
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Verify & Continue
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>

            {authStep === "email" && (
              <Alert variant="default" className="mt-2">
                <div className="flex items-start gap-2">
                  <InfoIcon className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <AlertTitle className="text-xs">
                      {isDirectLogin ? "Secure Login" : "Why Login?"}
                    </AlertTitle>
                    <AlertDescription className="text-xs">
                      {isDirectLogin
                        ? "We'll send a one-time code to your email for secure access to your dashboard."
                        : "You need an account to publish and manage your love quizzes. We'll send a one-time code to your email."}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header with Auth Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-white to-pink-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl border-2 border-pink-100 shadow-lg shadow-pink-500/10">
            <div className="text-3xl">🎀</div>
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Pookie Love Quiz
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {accessToken ? (
              <>
                <Badge variant="login" className="text-xs">
                
                  Logged In
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToDashboard}
                  className="text-xs gap-1"
                >
                  <Home className="h-3 w-3" />
                  Your Pookie Response
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs gap-1"
                >
                  <LogOut className="h-3 w-3" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAuthModal(true)}
                className="text-xs gap-1"
              >
                <Lock className="h-3 w-3" />
                Login
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs md:text-base text-pink-600 font-medium text-center">
          Create a personalized love quiz for your special someone
        </p>

        {/* Show success message and share options after publishing */}
        {publishedFormId ? (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
                  <Share2 className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <CardTitle>Quiz Published Successfully!</CardTitle>
                  <CardDescription>
                    Share this quiz with {userDetails.yourSpouseName}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="text-center py-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-7 w-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Pookie Love Quiz Created! 💕
                </h3>
                <p className="text-sm text-pink-500 mb-4">
                  Your personalized quiz is ready to share with{" "}
                  {userDetails.yourSpouseName}!
                </p>
              </div>

              <div className="space-y-2">
                <Label>Quiz Link</Label>
                <div className="flex gap-1.5">
                  <Input
                    value={`${window.location.origin}/form/${publishedFormId}`}
                    readOnly
                    className="text-xs font-mono flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/form/${publishedFormId}`,
                      );
                      showMessage(
                        "Copied!",
                        "Quiz link copied to clipboard!",
                        "success",
                      );
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <Button
                    className="gap-1.5 text-sm"
                    onClick={() => {
                      const text = `💖 ${userDetails.yourName}'s Love Quiz for ${userDetails.yourSpouseName} 💖\n\nTake this quiz to see how well you know our love story!\n\n${window.location.origin}/form/${publishedFormId}`;
                      navigator.clipboard.writeText(text);
                      showMessage(
                        "Copied!",
                        "Message copied to clipboard!",
                        "success",
                      );
                    }}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Copy Romantic Message
                  </Button>
                  <Button
                    className="gap-1.5 text-sm"
                    variant="outline"
                    onClick={() =>
                      window.open(`/form/${publishedFormId}`, "_blank")
                    }
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View Live Quiz
                  </Button>
                  <Button
                    className="gap-1.5 text-sm"
                    variant="secondary"
                    onClick={handleCreateNew}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create Another Quiz
                  </Button>
                  <Button className="gap-1.5 text-sm" onClick={goToDashboard}>
                    <Home className="h-3.5 w-3.5" />
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Progress Steps */}
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mt-3">
                      Progress
                    </h3>
                    <p className="text-xs text-pink-500">
                      Step {step} of {getTotalSteps()}
                    </p>
                  </div>
                  <Badge variant="default" className="text-xs px-2 py-0.5">
                    {Math.round(((step - 1) / getTotalSteps()) * 100)}%
                  </Badge>
                </div>

                <div className="relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-pink-100 rounded-full" />

                  <div
                    className="absolute top-4 left-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />

                  <div className="flex justify-between relative z-10">
                    {["Story", "Questions", "Reveal"].map((label, index) => (
                      <div key={label} className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
          ${
            step >= index + 1
              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow scale-110 ring-2 ring-pink-200"
              : "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-500"
          }`}
                        >
                          {index + 1}
                        </div>

                        <span
                          className={`text-xs mt-2 font-medium ${
                            step >= index + 1
                              ? "text-pink-600"
                              : "text-pink-400"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* STEP 1: YOUR LOVE STORY */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    
                    <img src={love} alt="" className="w-16 h-16"/>
                    <div>
                      <CardTitle>Memory Check: Love Edition</CardTitle>
                      <CardDescription>
                        A sweet test of your partner’s memory
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="space-y-1.5">
                    <Label>
                      <User className="h-3.5 w-3.5" />
                      Your Name *
                    </Label>
                    <Input
                      placeholder="Enter your name"
                      value={userDetails.yourName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          yourName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      <Heart className="h-3.5 w-3.5" />
                      Your Partner's Name *
                    </Label>
                    <Input
                      placeholder="Enter your partner's name"
                      value={userDetails.yourSpouseName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          yourSpouseName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Alert>
                    <div className="flex items-start gap-2">
                      <div className="p-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 flex-shrink-0">
                        <InfoIcon className="h-3 w-3 text-pink-500" />
                      </div>
                      <div>
                        <AlertTitle className="text-xs md:text-sm text-pink-600">
                          Personalized Questions
                        </AlertTitle>
                        <AlertDescription className="text-xs">
                          We'll use these names to create personalized questions
                          for your love quiz
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full gap-1.5 text-sm"
                    onClick={handleStartQuestions}
                    disabled={
                      !userDetails.yourName.trim() ||
                      !userDetails.yourSpouseName.trim()
                    }
                  >
                    <ArrowRight className="h-4 w-4" />
                    Start Creating Questions
                  </Button>
                </CardFooter>
                
              </Card>
            )}

            {/* STEP 2: CREATE QUESTIONS */}
            {step === 2 && (
              <div className="space-y-3 md:space-y-4">
                {/* Question Navigation */}
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <div className="text-sm font-semibold text-gray-800 mt-3">
                          Question {currentField + 1} of 5
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-1.5 pt-2">
                      {fields.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToField(index)}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentField ? "bg-rose-500 scale-125" : index < currentField ? "bg-rose-500" : "bg-pink-200"}`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Current Question Editor */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-r from-pink-100 to-rose-100">
                          <Edit2 className="h-4 w-4 text-pink-500" />
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg">
                            Question {currentField + 1}
                          </CardTitle>
                          <CardDescription className="text-xs md:text-sm">
                            {fields[currentField].type === "SELECT"
                              ? "Multiple Choice"
                              : "Text Answer"}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs md:text-sm">
                        {currentField + 1}/5
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    {/* Question Text and Image Upload - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Question Text */}
                      <div className="space-y-1.5">
                        <Label>
                          <Type className="h-3.5 w-3.5" />
                          Question *
                        </Label>
                        <Textarea
                          placeholder={getFieldPlaceholder(currentField)}
                          value={fields[currentField].label}
                          onChange={(e) => updateFieldLabel(e.target.value)}
                          rows={4}
                        />
                      </div>

                      {/* Question Image Upload */}
                      <div className="space-y-1.5">
                        <Label>
                          <ImageIcon className="h-3.5 w-3.5" />
                          Question Image (Optional)
                        </Label>
                        <p className="text-[10px] text-gray-500 -mt-1">
                          For question context/reference
                        </p>
                        {fields[currentField].imageFile ? (
                          <div className="relative h-[120px]">
                            <img
                              src={URL.createObjectURL(
                                fields[currentField].imageFile,
                              )}
                              alt="Question"
                              className="w-full h-full object-cover rounded-xl border-2 border-pink-100"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0"
                              onClick={removeQuestionImage}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-pink-300 rounded-xl p-4 text-center hover:border-pink-400 transition-colors h-[120px] flex items-center justify-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleQuestionImageUpload}
                              className="hidden"
                              id={`question-image-${currentField}`}
                            />
                            <label
                              htmlFor={`question-image-${currentField}`}
                              className="cursor-pointer"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <ImageIcon className="h-6 w-6 text-pink-400" />
                                <p className="text-xs text-pink-500">
                                  Upload image
                                </p>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label>
                        <Radio className="h-3.5 w-3.5" />
                        Question Type
                      </Label>
                      <Tabs
                        value={fields[currentField].type}
                        onValueChange={changeFieldType}
                      >
                        <TabsList>
                          <TabsTrigger value="SELECT">
                            <List className="h-3 w-3 mr-1" />
                            Multiple Choice
                          </TabsTrigger>
                          <TabsTrigger value="TEXT">
                            <TextCursor className="h-3 w-3 mr-1" />
                            Text Answer
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {fields[currentField].type === "SELECT" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>
                            <Check className="h-3.5 w-3.5" />
                            Options (2-4 Required) *
                          </Label>
                          <span className="text-xs text-pink-500">
                            {
                              fields[currentField].options.filter((o) =>
                                o.trim(),
                              ).length
                            }
                            /{fields[currentField].options.length} filled
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {fields[currentField].options.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1.5"
                            >
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setCorrectAnswer(option)}
                                  className="h-5 w-5 rounded-full border-2 border-pink-300 flex items-center justify-center hover:border-pink-400 transition-colors flex-shrink-0"
                                  title="Select as correct answer"
                                >
                                  {fields[currentField].correctAnswer ===
                                    option && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                                  )}
                                </button>
                                <span className="text-xs font-bold text-pink-600 w-4 flex-shrink-0">
                                  {String.fromCharCode(65 + index)}
                                </span>
                              </div>
                              <Input
                                placeholder={getOptionPlaceholder(
                                  currentField,
                                  index,
                                )}
                                value={option}
                                onChange={(e) =>
                                  updateFieldOption(index, e.target.value)
                                }
                                className="flex-1"
                              />
                              {fields[currentField].options.length > 2 && (
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => removeFieldOption(index)}
                                  className="flex-shrink-0 h-11 w-11"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>

                        {fields[currentField].options.length < 4 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addFieldOption}
                            className="w-full text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Option ({fields[currentField].options.length}/4)
                          </Button>
                        )}

                        {fields[currentField].correctAnswer && (
                          <Alert variant="success" className="mt-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                              <div>
                                <AlertTitle className="text-xs">
                                  Correct Answer Selected
                                </AlertTitle>
                                <AlertDescription className="text-xs">
                                  "{fields[currentField].correctAnswer}"
                                </AlertDescription>
                              </div>
                            </div>
                          </Alert>
                        )}
                      </div>
                    )}

                    {fields[currentField].type === "TEXT" && (
                      <div className="space-y-2">
                        <div className="space-y-1.5">
                          <Label>
                            <MessageSquare className="h-3.5 w-3.5" />
                            Expected Answer (Optional)
                          </Label>
                          <Input
                            placeholder="Type the expected answer (optional)"
                            value={fields[currentField].correctAnswer || ""}
                            onChange={(e) => setExpectedAnswer(e.target.value)}
                            className="flex-1"
                          />
                          <p className="text-xs text-gray-500">
                            Leave empty if you want to accept any answer (no
                            score impact)
                          </p>
                        </div>
                        <Alert>
                          <div className="flex items-start gap-2">
                            <TextCursor className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <AlertTitle className="text-xs">
                                Text Answer Question
                              </AlertTitle>
                              <AlertDescription className="text-xs">
                                This question accepts any text answer. You can
                                optionally specify an expected answer for
                                scoring, or leave it empty to give credit
                                regardless of the answer.
                              </AlertDescription>
                            </div>
                          </div>
                        </Alert>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <div className="flex w-full gap-2">
                      <Button
                        variant="outline"
                        className="gap-1.5 flex-1 text-xs md:text-sm"
                        onClick={goToPrevField}
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {currentField === 0 ? "Back to Story" : "Previous"}
                      </Button>
                      <Button
                        className="gap-1.5 flex-1 text-xs md:text-sm"
                        onClick={goToNextField}
                      >
                        {currentField === 4 ? (
                          <>
                            <ArrowRight className="h-3.5 w-3.5" />
                            Continue to Reveal
                          </>
                        ) : (
                          <>
                            <ArrowRight className="h-3.5 w-3.5" />
                            Next Question
                          </>
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* STEP 3: FINAL REVEAL AND PUBLISH */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
                      <Gift className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle>Final Reveal & Publish</CardTitle>
                      <CardDescription>
                        Add a special message and publish your quiz
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="space-y-1.5">
                    <Label>
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reveal Message *
                    </Label>
                    <Textarea
                      placeholder={`Write a special message that ${userDetails.yourSpouseName} will see after completing the quiz...`}
                      value={reveal.revealText}
                      onChange={(e) =>
                        setReveal({ ...reveal, revealText: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label>
                      <ImageIcon className="h-3.5 w-3.5" />
                      Reveal Image (Optional)
                    </Label>
                    {reveal.revealImageFile ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(reveal.revealImageFile)}
                          alt="Reveal"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            setReveal({ ...reveal, revealImageFile: null })
                          }
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-pink-300 rounded-xl p-4 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="reveal-image"
                        />
                        <label
                          htmlFor="reveal-image"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <ImageIcon className="h-8 w-8 text-pink-400" />
                            <p className="text-xs text-pink-500">
                              Upload a special image
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  <Alert>
                    <div className="flex items-start gap-2">
                      <div className="p-1 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 flex-shrink-0">
                        <Heart className="h-3 w-3 text-pink-500" />
                      </div>
                      <div>
                        <AlertTitle className="text-xs md:text-sm text-pink-600">
                          Special Message
                        </AlertTitle>
                        <AlertDescription className="text-xs">
                          This message will be shown to{" "}
                          {userDetails.yourSpouseName} after they complete the
                          quiz. Make it personal and romantic!
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>

                  <Alert variant="default">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <AlertTitle className="text-sm">
                          Ready to Publish!
                        </AlertTitle>
                        <AlertDescription className="text-xs">
                          {accessToken ? (
                            <>
                              Clicking "Publish Quiz" will create and publish
                              your love quiz. You'll be able to share it
                              immediately with {userDetails.yourSpouseName}.
                            </>
                          ) : (
                            <>
                              You need to log in to publish your quiz. Clicking
                              "Publish Quiz" will prompt you to log in or sign
                              up.
                            </>
                          )}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="gap-1.5 w-full text-xs md:text-sm"
                    onClick={() => setStep(2)}
                    disabled={loading}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Questions
                  </Button>
                  <Button
                    className="gap-1.5 w-full text-xs md:text-sm"
                    onClick={() =>
                      accessToken ? handlePublishAll() : openAuthModal(false)
                    }
                    disabled={loading || !reveal.revealText.trim()}
                  >
                    {loading ? (
                      <>
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Publishing Quiz...
                      </>
                    ) : (
                      <>
                        <Heart className="h-3.5 w-3.5" />
                        {accessToken ? "Publish Love Quiz" : "Login & Publish"}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

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

export default Create;
