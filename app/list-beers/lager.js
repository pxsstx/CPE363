// const category = "lager";
import beers from "./lager-lists";

// document.addEventListener("DOMContentLoaded", () => {
//   const token = Cookies.get("auth_token");
//   const session = Cookies.get("user_session");
//   const dashboardLink = document.getElementById("dashboard");

//   // const beer = async () => {
//   //   await axios.get(`http://localhost:3001/beers/category/${category}`);
//   // };

//   // 1. Protection: Check if session exists
//   if (!token || !session) {
//     window.location.href = "../../app/login.html";
//     return;
//   }

//   // 2. Decode the session FIRST before using it
//   const userData = JSON.parse(session);

//   // 3. Update the profile (e.g., John D.)
//   const profile = document.getElementById("profile");
//   if (profile) {
//     profile.innerText = `${userData.firstName} ${userData.lastName.slice(0, 1)}.`;
//   }

//   // 4. Role-based Visibility
//   // Change to "ADMIN" if the dashboard is only for staff
//   if (userData.role === "ADMIN" && dashboardLink) {
//     dashboardLink.classList.remove("hidden");
//     dashboardLink.classList.add("block");
//   }

//   // 5. Global Axios configuration
//   if (window.axios) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const lagerBeersList = document.getElementById("lager-beers-list");

  if (lagerBeersList) {
    lagerBeersList.innerHTML = beers
      .map(
        (beer) => `
            <div class="group relative w-full h-96 bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">

                <!-- Image -->
                <img src="${beer.image}"
                    alt="${beer.name}"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100">

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500">
                </div>

                <!-- Top Badges -->
                <div class="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <button class="p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-beer-gold hover:text-white">
                        <i data-lucide="heart" class="w-5 h-5"></i>
                    </button>
                    <span class="px-3 py-1 bg-beer-gold/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                        Lager
                    </span>
                </div>

                <!-- Bottom Content -->
                <div class="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 class="text-2xl font-bold text-white mb-1 leading-tight group-hover:text-beer-gold transition-colors duration-300">
                        ${beer.name}
                    </h3>
                    <div class="flex items-center gap-4 text-gray-300 text-sm mb-4">
                        <div class="flex items-center text-yellow-400 gap-1">
                            <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            <span class="font-bold text-white">${beer.rating}</span>
                        </div>
                        <span class="text-gray-500">|</span>
                        <span>ABV ${beer.abv}</span>
                        
                    </div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-white group-hover:text-beer-gold transition-colors duration-300 text-lg font-bold">$${beer.price}</span>
                    </div>

                    <div class="h-0 overflow-hidden group-hover:h-12 transition-all duration-500 ease-in-out">
                        <button class="w-full bg-white text-black font-semibold py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-beer-gold hover:text-white transition-colors duration-300">
                            <a href="detail.html" class="w-full h-full flex items-center justify-center">View Details <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i></a>
                            
                        </button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    lucide.createIcons();
  }
});
