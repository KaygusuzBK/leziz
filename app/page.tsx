import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionTitle from "./components/SectionTitle";
import RecipeCard from "./components/RecipeCard";
import CategoryCard from "./components/CategoryCard";

const featuredRecipes = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCKXfV_qFrfC3QEDsnOqUgxbaTSuJK8gc8IaP8UpbNtHZZ5swgJSCB9lJU_JrqNlMx3b2JRlAdDweeuu3p-1fStReG7d8MCXkFhYCCnViaJY4bd_CmyLJXq6q6LqbTrm1IPqZ2ne4SNaB79pk598pRaSRRZ0lg3HFC95Rn_4_pPY1Y_sznUSxXWW7WadjZ3Hkl35XO9OI6meCjzM5w6zW6G26V7aZaqjYaTXJLzlDrWrMPuEX06Zb9ynwB00rQ61cK4gnGb2ZbNbkp",
    title: "Kremalı Domatesli Makarna",
    description: "Kremalı domates soslu, lezzetli ve pratik bir makarna tarifi."
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASYe7PfBu3yeowsgR0FuH0MKvVTsaCP0MDWnVLkXbDeWTErRUZDvoPKFv2ATAsY6OrypDSWu-4QfPy1-R785Ngvii4DM5oGqU1tjZGY26NJdJT0wguhnWRBjppKqZTUWTka_e98W1SnIt51B_IaiigKt1CEhqq72FDQir2N1D-y3xT8ol5iAKv1GboXYIVdRTrfopli6M5StmSgpONhcdZK2dPCcWXjx4DKgYdDYeWNMTBtjyB-BPk7MlUInAODbzLJ4dS9ULhqf5J",
    title: "Yaz Salatası",
    description: "Mevsim sebzeleriyle hazırlanan ferahlatıcı bir salata."
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDa0WgcpuEMRddMzR7gCMDxmHrQLsk3A7yRQ5USGlvOMG7HeDew6Pc3Jrqd8pc7Cpo0jxoPG7ZNPNkdRDAWU0ttpScLayu9g1l7mtggNMUrjg2i5RmFcOe7OJUcI2q60_d6baaF8aj3DGZs6lHNvqbnl6mh9ynCgw5kTa2ClbTYLQ84RponETmjW_xfH0mqsyr-n1IbijG_6f3QqbqcFNxRf1SPILoObPYfcElhfA2yxh95IHnG5LuU3wi8SRaVksbT1DYYWVIB88nt",
    title: "Çikolatalı Sufle",
    description: "Akışkan çikolata dolgulu nefis bir sufle."
  }
];

const latestRecipes = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMtuh7e9SiB960zxF8eidVY5n_ANHiOpl6mBzKAPY7pUiPAYc-LMJZ7AiaAWdz9H-a06qb69WiWaqPVd5rYfbHZgVM-5VUkv8z8xYUJEMVcUmKHhd0F6JXcUctMxI2MHcDI0oLZCwPFu2l5uxdio3S-uStVYJMZCXSlbI5HZEbSF4pRMP01VtsvH6sJ9EewxuCDEsCxGD69aY-QzHHiQDYD_V4fCnAFaZE8Chhy8ETtszgq0hhRhJxkCkPRmf5TmnJDKHZG0hqlWor",
    title: "Baharatlı Tavuklu Taco",
    description: "Baharatlı tavuk, taze salsa ve kremalı sos ile dolu taco."
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9yyDQ9ynxAe4KRMymlY8zWtC8sIPMso2P73R64D09ixuprBPdl9IEZ-XgiCCEyr1K-Z1FEcnl3mspQj5TwEWRJ3eSqEZLcfnZEVUmQ9hiSbRw5MoV_iI__rQGZDhAz2dkUUL9-RVmbr9VQq9sBZQKnXALQsL-2KRaahoHmIiXyip7psa6WlWstI3KRu0-ovmac_DknhrCQQHhuX8vEWd3kHas9c2I64ZDM8rwOwKSbH_0q3zbfVYlFI35diSV79icNbu5GhI7reRi",
    title: "Vejetaryen Chili",
    description: "Bol sebzeli ve bakliyatlı doyurucu bir chili."
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmheUUngbd6-U5jiFRJSIFD6v9G7Y-LR7xuuSvrTcD5g9XPAmJZzdxmKw3MD5d-E41rhhytDo7oJ7CS6INSRdGNQiTVwmnkNpHyp80kyB7PfIVh70FNH1E3C8vRgWECVspKhkJ9nPraBAVKJnboNLVVtvpMx4YzxiAtL6kQZ9hTXw1ARYA5Qe0ZUTv_Wcf6NS0xaVyyjNBvTODLjZhd_3xD0197azx_S3EKHlzaZYkZz1jaSjm1V0nbv8B09ABCg9TSW1skfRvKmiE",
    title: "Limonlu Otlu Fırın Tavuk",
    description: "Limon ve taze otlarla marine edilmiş fırın tavuk."
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDabDQmPWatZFRnstSeUx4vxURE--nvm-39_tRYcqVvX9ljGuJ2jDXjFxGMRcC0YqqMWBZUHVmuiZz3EAu37FbZYUM8NEX5kcwwVKp8lncRkeI4Qvu6c3TjzJ8e5HGotKSP5-ydgShztX0ezu6YXXqihD7Z4YNSbzdo3Z2HRJGhDcTKTkQ4eZVU5jAW-pYBb4k3RciF1bE_saHPro7bWhxY1SjtE-X8JvJ0vWS4ChF6jhyDp_qPdvCOkeileTxzoXNZpqM7siVWhgyw",
    title: "Elmalı Crumble",
    description: "Tatlı elma dolgulu ve kıtır üst kaplamalı klasik bir tatlı."
  }
];

const categories = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB30s8Lm-Xs29BrkK_oHdxKf4QOz3R3UIM8V1WzHO3LVr3Mbkh9u7zNMW6dWp32kQw6YZzdCLuYK55xnheOuRgV3MEU1iyYXjSl4aT4FFYS2ghpfiQbpwD0g_ETERt8_wW2npQIy08Ef6h1gpqGDXg3mnahvuoTLRQmssEpBqeeyZiZxcsHQb0M7ZcLq1xoag2TnVjQZ-PUhXcS54bKKDtZO_xv30H2tX7SvoPRgN235Saw2ErZXgQ9BD-eMkL9PtfCZYOvpwpAtGwa",
    title: "İtalyan"
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRjjJFDxbnP7hyBkKV45n9rzgcWPMZ4RIQ2WCrTJZljq1X217leXgGUJIlK1tmrvkUvBmmFlkOFo7jF0OFMfOGJSeqyu1h0qfNlSVhOG8A-EqJv3vWtOwF3YCnpI9JFMVNIslv5EIaXZu_f7LLVCyYxXXko-x0-XKgXXX_KKQuCtXdAxU2N3YELAmJcwoJnhIvBbe-GCXW-HUICgfFJnXtw7t1u8mYEv0OGgj4LU_MyiRDaE6elMfWnGK_RdU0ydlEtjyFsGVy0Vm_",
    title: "Meksika"
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD-E0BkYnFbgjxOflGSuV1uiECYE6BbKZWljIlSHqWtkR4VCSolOuhtQOoyQkx6JMzZvx8PhBzE5YMHXbxde1jEYqRyTIv8EwEqrYL85cjQ8Si6cRDO0ok-dS6zqDRT4SiJTBhXaGGo_skov8feFKBKB37wufMyPEcs6WjSDC1Yyy1jE0FTCUHfq-KIndL3XeJKtWa_v4Ew2OfZBiv57Fa9Zz8QQv7XN_EgK0b2itowDGb1Yb3Azfnh78vI78hcJbxRSHwEuk8D8cS",
    title: "Vejetaryen"
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-OHdhh6L6R08XFscXzh7oRwN3VPNqX14teS3vguYOjvlrB0xsKqZubTkkIILEOjFlGqJdFoLwqfEUmrthqAPux5Y-w1sSHeNpTLaG5mVJ3tuOfzCWr5vjDNRQFdHtHz2UZPjriiOUsgfaQpFIq5obdUg8QvupiJMqfiGLqQ9XIZM75ly-iW9oyjZ_uCDDSfLI9psR-gS0KOyyp3Uj-R0DOO_Udyaraf3jUzD7NHbgXRJ-g_gB4eEeQM6J3wA9u1mWex_v2lVAfy1V",
    title: "Tatlılar"
  }
];

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#fcf9f8] group/design-root overflow-x-hidden" style={{fontFamily: 'Epilogue, "Noto Sans", sans-serif'}}>
      <Header />
      <div className="layout-container flex h-full grow flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Hero Section */}
        <div className="mb-8 px-4 md:px-8 lg:px-12">
          <div className="px-2 md:px-4 py-2 md:py-3">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#fcf9f8] rounded-xl min-h-60 md:min-h-80"
              style={{
                backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSGynRMJMNy_-sQqH4X7NjpLJyS65M4JLF-c9K0X2tOzxr-loC20PQmE4zLQ5iuppOT4QGCypbIg45jfQTSWT93Geow6CoiF-DHMaTEfLH5BlNbnh_3GSoJYVXEbFym5EOoacXGxqqJdFlAJxuaLRtFjUimxgmiyRHgxqYPRwBVnmEkVrSwhZ3Y27P5Qz5soBLzXoL4tykQpggcHFR3Pv4Ed6siWXGKGBHDo1eFNG4tJonvJLkpQwYgmGCdqhtNyG24XLhNCDx9JRU")'
              }}
            >
              <div className="flex p-4">
                <p className="text-white tracking-light text-xl md:text-2xl lg:text-[28px] font-bold leading-tight">
                  Lezzetli Tarifleri Keşfet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Recipes */}
        <SectionTitle title="Öne Çıkan Tarifler" />
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex items-stretch p-4 gap-3 min-w-full">
            {featuredRecipes.map((recipe, i) => (
              <RecipeCard key={i} {...recipe} />
            ))}
          </div>
        </div>

        {/* Latest Recipes */}
        <SectionTitle title="En Yeni Tarifler" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
          {latestRecipes.map((recipe, i) => (
            <RecipeCard key={i} {...recipe} />
          ))}
        </div>

        {/* Popular Categories */}
        <SectionTitle title="Popüler Kategoriler" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
