import { useEffect, useRef } from "react"

export default function ErrorBanner({error}) {
    const bannerRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            bannerRef.current.hidden = true;
        }, 3000);
    }, []);

    return (
        <p ref={bannerRef} id="banner">
            {error}

            <style jsx>{`
                #banner {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    padding: 1em 0;
                    text-align: center;
                    background: red;
                    color: white;
                    font-size: 1.3em;
                }
            `}</style>
        </p>
    )
}
