import { useState, useEffect } from "react";

export function useGreeting() {
    // Initialize with empty string to match server render
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting("Good Morning");
        else if (hour >= 12 && hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    return greeting;
}
