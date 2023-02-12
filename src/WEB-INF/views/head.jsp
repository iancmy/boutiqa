<% String contextPath = request.getContextPath(); %>

<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Icon -->
<link rel="icon" type="image/png" href="<%=contextPath %>/img/logo.png" />

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>

<!-- TailwindCSS + DaisyUI -->
<script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio,line-clamp"></script>
<script>
  tailwind.config = {
    daisyui: {
      themes: ["fantasy", "dracula"],
    },
  };
</script>
<link
  href="https://cdn.jsdelivr.net/npm/daisyui@2.46.1/dist/full.css"
  rel="stylesheet"
  type="text/css"
/>

<!-- Fontawesome Icons -->
<script
  src="https://kit.fontawesome.com/f761f426a2.js"
  crossorigin="anonymous"
></script>

<!-- Common CSS -->
<link href="<%=contextPath %>/css/app.css" rel="stylesheet" type="text/css" />

<!-- Common JS -->
<script>
  const isLoggedInUrl = "<%=contextPath %>/api/isLoggedIn";
  const updateProfileAPI = "<%=contextPath %>/api/updateProfile";
  const changePasswordAPI = "<%=contextPath %>/api/changePassword";
  const cartDetailsAPI = "<%=contextPath %>/api/cartDetails";
  const getProductAPI = "<%=contextPath %>/api/getProduct";
  const searchProductAPI = "<%=contextPath %>/api/getAllProducts";
  const addToCartAPI = "<%=contextPath %>/api/addToCart";
</script>
<script type="module" src="<%=contextPath %>/js/styles.js"></script>
<script type="module" src="<%=contextPath %>/js/app.js"></script>
