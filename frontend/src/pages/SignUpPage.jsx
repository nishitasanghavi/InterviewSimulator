import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignupPage() {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // Clear field error on change
  };

  // Firebase Error Messages
  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/email-already-in-use": "This email is already registered. Try logging in.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Password must be at least 6 characters long.",
      "auth/missing-password": "Password is required.",
      "auth/missing-email": "Email is required.",
      "auth/internal-error": "An unexpected error occurred. Try again later.",
    };
    return errorMessages[errorCode] || "Something went wrong. Please try again.";
  };

  // Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    let errors = {};
    if (!userData.name.trim()) errors.name = "Name is required.";
    if (!userData.email.trim()) errors.email = "Email is required.";
    if (!userData.password.trim()) errors.password = "Password is required.";
    
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return; // Stop if validation fails

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // Update user profile with the provided name
      await updateProfile(userCredential.user, { displayName: userData.name });

      localStorage.setItem("token", await userCredential.user.getIdToken());
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (error) {
      setError(getErrorMessage(error.code)); // Show friendly error messages
    }
  };

  // Google Sign-In
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("token", await result.user.getIdToken());
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (error) {
      setError(getErrorMessage(error.code));
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-indigo-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-lg flex"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left side - Dark section */}
        <motion.div 
          className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-10 relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute top-10 left-10">
            <div className="text-white text-4xl font-bold flex items-center">
              <span className="text-white mr-1">◆</span>
              AI Mock Interview<span className="text-white">.</span>
            </div>
          </div>
          <motion.div 
            className="mt-10 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img src="src/assets/signuppage.png" alt="Signup Illustration" />
          </motion.div>
          <div className="max-w-md">
            <p className="text-lg italic text-gray-100 leading-relaxed">
              <span className="text-xl font-bold text-white">Take your interview preparation </span> 
              to the next level with our 
              <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent font-bold">
                {" "}AI-powered simulator. 
              </span> 
              Get real-time feedback, practice with industry-specific questions, and track your progress.
            </p>
          </div>
        </motion.div>

        {/* Right side - White section */}
        <motion.div 
          className="w-1/2 p-10 relative"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-600 mb-6">Enter your details to start using Cashify!</p>

          <motion.button 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 mb-4 hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignup}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </motion.button>

          <div className="flex items-center gap-2 my-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <div className="text-gray-500 text-sm">or</div>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            {["Name", "Email", "Password"].map((field, index) => (
              <motion.div key={field} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <label className="block text-sm font-medium mb-1">{field}</label>
                <input 
                  type={field.toLowerCase() === "password" ? "password" : "text"} 
                  name={field.toLowerCase()}
                  value={userData[field.toLowerCase()]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors[field.toLowerCase()] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                  }`}
                  placeholder={`Enter your ${field.toLowerCase()}`} 
                  required
                />
                {fieldErrors[field.toLowerCase()] && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors[field.toLowerCase()]}</p>
                )}
              </motion.div>
            ))}

            <motion.button type="submit" className="w-full py-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg">
              Sign Up
            </motion.button>
          </form>
          <div className="text-center mt-6">
                      <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-500 font-medium">
                          Login
                        </Link>
                      </p>
                    </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
