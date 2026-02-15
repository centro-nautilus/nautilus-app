
import { Hero } from "../../components/home-sections/Hero"
import { Benefits } from "../../components/home-sections/Benefits"

import { Services } from "../../components/home-sections/Services"
import { Instructions } from "../../components/home-sections/Instructions"
import { useOutletContext } from "react-router"
import { useEffect, useRef } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import { Contact } from "../../components/home-sections/Contact"

export interface NautilusLayoutContext {
    closeMenu: () => void;
    scrollTarget: string;
    setSectionActive: React.Dispatch<React.SetStateAction<string>>

}

export const HomePage = () => {
    const { scrollTarget, setSectionActive } = useOutletContext<NautilusLayoutContext>();
    const homeSection = useRef<HTMLDivElement>(null);
    const serviceSection = useRef<HTMLDivElement>(null);
    const contactSection = useRef<HTMLDivElement>(null);

    const scrollTo = (section: string) => {
        let top = 0;
        const offset = 150;

        if (section === "home") top = homeSection.current?.offsetTop ?? 0;
        if (section === "services") top = serviceSection.current?.offsetTop ?? 0;
        if (section === "contacts") top = contactSection.current?.offsetTop ?? 0;

        window.scrollTo({
            top: top - offset,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        scrollTo(scrollTarget)
    }, [scrollTarget])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        setSectionActive(sectionId)
                    }
                });
            },
            {
                root: null,
                threshold: 0.4,
            }
        );

        if (homeSection.current) observer.observe(homeSection.current);
        if (serviceSection.current) observer.observe(serviceSection.current);
        if (contactSection.current) observer.observe(contactSection.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 800, once: true, disable: () => {
                return window.innerWidth < 768;
            },
        });
    }, []);


    return <div className="flex flex-col gap-8">
        <section ref={homeSection} id="home"><Hero /></section>
        <div className="
            flex flex-col 
            px-4 md:px-32 md:gap-32 md:pb-16 gap-16
        ">
            <section data-aos="fade-up" className="mt-4 md:mt-0"><Benefits /></section>
            <section data-aos="fade-up"><Instructions /></section>
            <section ref={serviceSection} id="services" data-aos="fade-up"><Services /></section>
            <section ref={contactSection} id="contacts" data-aos="fade-up"><Contact /></section>
        </div>
    </div>
}