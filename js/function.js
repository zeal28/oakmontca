(function ($) {
  "use strict";

  var $window = $(window);
  var $body = $("body");

  /* Preloader Effect */
  $window.on("load", function () {
    $(".preloader").fadeOut(600);
  });

  /* Slick Menu JS */
  $("#menu").slicknav({
    label: "",
    prependTo: ".responsive-menu",
  });

  if ($("a[href='#top']").length) {
    $("a[href='#top']").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  }

  /* testimonial Slider JS */
  if ($(".testimonial-slider").length) {
    const testimonial_slider = new Swiper(".testimonial-slider .swiper", {
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".hero-button-next",
        prevEl: ".hero-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 1,
        },
      },
    });
  }

  /* Init Counter */
  if ($(".counter").length) {
    $(".counter").counterUp({ delay: 6, time: 3000 });
  }

  /* Image Reveal Animation */
  if ($(".reveal").length) {
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });
      tl.set(container, {
        autoAlpha: 1,
      });
      tl.from(container, 1, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1, {
        xPercent: 100,
        scale: 1,
        delay: -1,
        ease: Power2.out,
      });
    });
  }

  /* Text Effect Animation */
  if ($(".text-anime-style-1").length) {
    let staggerAmount = 0.05,
      translateXValue = 0,
      delayValue = 0.5,
      animatedTextElements = document.querySelectorAll(".text-anime-style-1");

    animatedTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.words, {
        duration: 1,
        delay: delayValue,
        x: 20,
        autoAlpha: 0,
        stagger: staggerAmount,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  if ($(".text-anime-style-2").length) {
    let staggerAmount = 0.05,
      translateXValue = 20,
      delayValue = 0.5,
      easeType = "power2.out",
      animatedTextElements = document.querySelectorAll(".text-anime-style-2");

    animatedTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.chars, {
        duration: 1,
        delay: delayValue,
        x: translateXValue,
        autoAlpha: 0,
        stagger: staggerAmount,
        ease: easeType,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  if ($(".text-anime-style-3").length) {
    let animatedTextElements = document.querySelectorAll(".text-anime-style-3");

    animatedTextElements.forEach((element) => {
      //Reset if needed
      if (element.animation) {
        element.animation.progress(1).kill();
        element.split.revert();
      }

      element.split = new SplitText(element, {
        type: "lines,words,chars",
        linesClass: "split-line",
      });
      gsap.set(element, { perspective: 400 });

      gsap.set(element.split.chars, {
        opacity: 0,
        x: "50",
      });

      element.animation = gsap.to(element.split.chars, {
        scrollTrigger: { trigger: element, start: "top 90%" },
        x: "0",
        y: "0",
        rotateX: "0",
        opacity: 1,
        duration: 1,
        ease: Back.easeOut,
        stagger: 0.02,
      });
    });
  }

 // Debug function to check EmailJS setup
  function checkEmailJSSetup() {
    console.log("=================================");
    console.log("🔧 EmailJS Setup Check");
    console.log("=================================");

    // Check if EmailJS library is loaded
    if (typeof emailjs !== "undefined") {
      console.log("✅ EmailJS library loaded");
    } else {
      console.log("❌ EmailJS library NOT loaded");
      console.log(
        'Add this to your HTML head: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>'
      );
    }

    // Check configuration
    console.log("Configuration:", EMAILJS_CONFIG);

    if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE") {
      console.log("⚠️ Please update your EmailJS PUBLIC_KEY");
    }

    if (EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID_HERE") {
      console.log("⚠️ Please update your EmailJS SERVICE_ID");
    }

    if (EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID_HERE") {
      console.log("⚠️ Please update your EmailJS TEMPLATE_ID");
    }

    // Check form elements
    var formElements = {
      form: $("#contactForm").length,
      fname: $("#fname").length,
      lname: $("#lname").length,
      email: $("#email").length,
      phone: $("#phone").length,
      message: $("#message").length, // Updated from #msg to #message
      submitBtn: $("#submitBtn").length,
      msgSubmit: $("#msgSubmit").length,
    };

    console.log("Form elements found:", formElements);

    // Check for conflicting PHP references
    $("form").each(function (index) {
      var action = $(this).attr("action");
      if (action && action.includes(".php")) {
        console.warn("⚠️ Found PHP reference in form:", action);
        console.log("Remove action attribute from form tag");
      }
    });

    console.log("=================================");
  }

  // Run debug check when page loads
  $(document).ready(function () {
    setTimeout(checkEmailJSSetup, 1000); // Delay to ensure everything is loaded
  });

  /* Animated Wow Js */
  new WOW().init();

  /* Popup Video */
  if ($(".popup-video").length) {
    $(".popup-video").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
  }

/* Contact form validation - Enhanced with individual field errors */

// EmailJS Configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "SfPSh1u6LmOv3_wS3", // Your EmailJS public key
  SERVICE_ID: "service_4gv86cj", // Your EmailJS service ID
  TEMPLATE_ID: "template_xah23zq", // Your EmailJS template ID
};

// Initialize EmailJS when page loads
$(document).ready(function () {
  console.log("🚀 Document ready, initializing...");

  // Wait a bit for all elements to load
  setTimeout(function () {
    // Initialize EmailJS
    if (typeof emailjs !== "undefined") {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log("✅ EmailJS initialized successfully");
    } else {
      console.error("❌ EmailJS library not loaded");
    }

    // Setup contact form
    setupContactForm();

    // Run debug check
    checkEmailJSSetup();
  }, 500);
});

function setupContactForm() {
  console.log("🔧 Setting up contact form...");

  var $contactform = $("#contactForm");

  if ($contactform.length) {
    console.log("✅ Contact form found");

    // Clear all previous errors when user starts typing
    $contactform.find('input, textarea').on('input blur', function() {
      var fieldId = $(this).attr('id');
      clearFieldError(fieldId);
    });

    // Remove any existing event listeners and setup new one
    $contactform.off("submit").on("submit", function (event) {
      event.preventDefault(); // Always prevent default submission
      console.log("📝 Form submitted, processing...");

      // Clear all previous errors
      clearAllErrors();

      // Validate form with individual field errors
      if (validateContactFormWithFieldErrors()) {
        submitForm();
      }
    });
  } else {
    console.error("❌ Contact form not found");
  }
}

function validateContactFormWithFieldErrors() {
  console.log("🔍 Validating form with field-specific errors...");

  var isValid = true;
  var fieldsToValidate = [
    { id: 'fname', name: 'First Name' },
    { id: 'lname', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'message', name: 'Message' }
  ];
  
  // Check ALL fields at once and show ALL errors simultaneously
  fieldsToValidate.forEach(function(field) {
    var $field = $("#" + field.id);
    
    if ($field.length === 0) {
      console.error("❌ " + field.name + " field (#" + field.id + ") not found");
      isValid = false;
      return;
    }
    
    var value = $field.val() ? $field.val().trim() : "";
    
    if (!value) {
      showFieldError(field.id, "Please fill out this field.");
      isValid = false;
    } else if (field.id === 'email') {
      // Special validation for email format
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field.id, "Please enter a valid email address.");
        isValid = false;
      }
    }
  });

  // Log form values for debugging
  console.log("📋 Form validation result:", {
    isValid: isValid,
    totalErrors: isValid ? 0 : "Multiple fields have errors"
  });

  if (!isValid) {
    console.log("❌ Form validation failed - ALL field errors shown simultaneously");
    // Scroll to first error
    scrollToFirstError();
  } else {
    console.log("✅ All form validations passed");
  }

  return isValid;
}

function showFieldError(fieldId, errorMessage) {
  // Find the field and its error container
  var $field = $("#" + fieldId);
  var $errorContainer = $field.closest('.form-group').find('.help-block.with-errors');
  
  if ($errorContainer.length === 0) {
    console.warn("⚠️ Error container not found for field: " + fieldId);
    // Create error container if it doesn't exist
    $errorContainer = $('<div class="help-block with-errors"></div>');
    $field.after($errorContainer);
  }
  
  // Add error styling to field - make border red like in your image
  $field.addClass('error').css({
    'border-color': '#e74c3c !important',
    'border-width': '2px',
    'box-shadow': 'none'
  });
  
  // Show error message using your existing CSS structure (ul/li)
  $errorContainer.html('<ul><li>' + errorMessage + '</li></ul>')
                .show();
  
  console.log("❌ Field error shown:", fieldId, errorMessage);
}

function clearFieldError(fieldId) {
  // Find the field and its error container
  var $field = $("#" + fieldId);
  var $errorContainer = $field.closest('.form-group').find('.help-block.with-errors');
  
  // Remove error styling from field - restore normal border
  $field.removeClass('error').css({
    'border-color': '',
    'border-width': '',
    'box-shadow': ''
  });
  
  // Hide error message
  $errorContainer.empty().hide();
}

function clearAllErrors() {
  // Clear all field errors
  var fieldIds = ['fname', 'lname', 'email', 'phone', 'message'];
  fieldIds.forEach(function(fieldId) {
    clearFieldError(fieldId);
  });
  
  // Also clear the general message
  $("#msgSubmit").hide().empty();
  
  console.log("🧹 All errors cleared");
}

function scrollToFirstError() {
  // Find the first field with an error
  var $firstError = $('.form-control.error').first();
  if ($firstError.length > 0) {
    $('html, body').animate({
      scrollTop: $firstError.offset().top - 100
    }, 500);
    $firstError.focus();
  }
}

function submitForm() {
  console.log("📤 Submitting form via EmailJS...");

  // Show loading state
  setLoadingState(true);
  submitMSG(true, "📤 Sending your message...");

  // Check if EmailJS is available
  if (typeof emailjs === "undefined") {
    submitMSG(false, "❌ Email service not available. Please try again later.");
    setLoadingState(false);
    return;
  }

  // Get form element
  var formElement = document.getElementById("contactForm");

  if (!formElement) {
    console.error("❌ Form element not found");
    submitMSG(false, "❌ Form not found. Please refresh the page and try again.");
    setLoadingState(false);
    return;
  }

  // Set current date
  var currentDateInput = document.getElementById("current_date");
  if (currentDateInput) {
    currentDateInput.value = new Date().toLocaleString();
    console.log("📅 Current date set:", currentDateInput.value);
  }

  console.log("🚀 Sending email with EmailJS...");

  // Send email using EmailJS
  emailjs
    .sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, formElement)
    .then(function (response) {
      console.log("✅ Email sent successfully!", response.status, response.text);
      formSuccess();
    })
    .catch(function (error) {
      console.error("❌ Email sending failed:", error);

      var errorMessage = "";
      
      // Handle specific EmailJS errors
      if (error.text) {
        if (error.text.includes('quota') || error.text.includes('limit')) {
          errorMessage = "❌ We've reached our monthly email limit. Please contact us directly at enquiries@oakmontca.com or call (+0) 123 456 789.";
        } else if (error.text.includes('Invalid')) {
          errorMessage = "❌ There's a configuration issue. Please contact us directly at enquiries@oakmontca.com.";
        } else if (error.text.includes('Network')) {
          errorMessage = "❌ Network error. Please check your internet connection and try again.";
        } else {
          errorMessage = "❌ Sorry, there was a problem sending your message. Please try again later or contact us directly at enquiries@oakmontca.com.";
        }
      } else {
        errorMessage = "❌ Sorry, there was a problem sending your message. Please try again later.";
      }

      submitMSG(false, errorMessage);
    })
    .finally(function () {
      setLoadingState(false);
    });
}

function formSuccess() {
  console.log("✅ Form submitted successfully");

  // Reset form
  var $contactform = $("#contactForm");
  if ($contactform.length > 0) {
    $contactform[0].reset();
    console.log("✅ Form reset successfully");
  }

  // Clear all errors
  clearAllErrors();

  // Show success message
  submitMSG(
    true,
    "✅ Thank you! Your message has been sent successfully. We will contact you soon."
  );

  // Auto-hide success message after 8 seconds
  setTimeout(function () {
    var $msgSubmit = $("#msgSubmit");
    if ($msgSubmit.length > 0) {
      $msgSubmit.fadeOut(500);
    }
  }, 8000);
}

function submitMSG(valid, msg) {
  var $msgSubmit = $("#msgSubmit");

  if ($msgSubmit.length === 0) {
    console.warn("⚠️ #msgSubmit element not found");
    // Try to create it
    var $submitBtn = $("#submitBtn");
    if ($submitBtn.length > 0) {
      $msgSubmit = $('<div id="msgSubmit" class="h3"></div>');
      $submitBtn.after($msgSubmit);
      console.log("✅ Created #msgSubmit element");
    } else {
      console.error("❌ Cannot create message element - submit button not found");
      alert(msg); // Fallback to alert
      return;
    }
  }

  // Set message styles
  if (valid) {
    $msgSubmit.css({
      color: "#28a745",
      "background-color": "#d4edda",
      border: "1px solid #c3e6cb",
      padding: "15px",
      "border-radius": "8px",
      "margin-top": "15px",
      display: "block",
    });
  } else {
    $msgSubmit.css({
      color: "#dc3545",
      "background-color": "#f8d7da",
      border: "1px solid #f5c6cb",
      padding: "15px",
      "border-radius": "8px",
      "margin-top": "15px",
      display: "block",
    });
  }

  $msgSubmit.text(msg).show();
  console.log("💬 Message displayed:", msg);
}

function setLoadingState(isLoading) {
  var $submitBtn = $("#submitBtn");

  if ($submitBtn.length === 0) {
    console.warn("⚠️ Submit button (#submitBtn) not found");
    return;
  }

  if (isLoading) {
    $submitBtn
      .text("⏳ Sending...")
      .prop("disabled", true)
      .css("opacity", "0.7");
    console.log("⏳ Loading state enabled");
  } else {
    $submitBtn.text("submit now").prop("disabled", false).css("opacity", "1");
    console.log("✅ Loading state disabled");
  }
}

// Debug function to check EmailJS setup
function checkEmailJSSetup() {
  console.log("=================================");
  console.log("🔧 EmailJS Setup Check");
  console.log("=================================");

  // Check if EmailJS library is loaded
  if (typeof emailjs !== "undefined") {
    console.log("✅ EmailJS library loaded");
  } else {
    console.log("❌ EmailJS library NOT loaded");
  }

  // Check configuration
  console.log("📋 Configuration Check:");
  console.log("PUBLIC_KEY:", EMAILJS_CONFIG.PUBLIC_KEY);
  console.log("SERVICE_ID:", EMAILJS_CONFIG.SERVICE_ID);
  console.log("TEMPLATE_ID:", EMAILJS_CONFIG.TEMPLATE_ID);

  // Check form elements
  var formElements = {
    form: $("#contactForm").length,
    fname: $("#fname").length,
    lname: $("#lname").length,
    email: $("#email").length,
    phone: $("#phone").length,
    message: $("#message").length,
    submitBtn: $("#submitBtn").length,
    msgSubmit: $("#msgSubmit").length,
  };

  console.log("📋 Form elements found:", formElements);

  var missingElements = [];
  for (var key in formElements) {
    if (formElements[key] === 0) {
      missingElements.push("#" + key);
    }
  }

  if (missingElements.length > 0) {
    console.log("❌ Missing elements:", missingElements);
  } else {
    console.log("✅ All required form elements found");
  }

  console.log("=================================");
}

/* Contact form validation end */


})(jQuery);
