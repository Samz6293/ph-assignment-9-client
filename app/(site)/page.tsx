import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import PizzaCategories from "@/components/home/PizzaCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import FadeUp from "@/components/shared/FadeUp";

// each section fades up as it scrolls into view; the Hero is already on screen, so it fades in on load
export default function Home() {
    return (
        <>
            <FadeUp><Hero /></FadeUp>
            <FadeUp><FeaturedMenu /></FadeUp>
            <FadeUp><PizzaCategories /></FadeUp>
            <FadeUp><WhyChooseUs /></FadeUp>
            <FadeUp><HowItWorks /></FadeUp>
        </>
    )
}
