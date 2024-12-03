import React, { useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import '../../styles/ParaAnimation.css';

function ParaAnimation() {
    useEffect(() => {
        const handleScroll = () => {
            const splitText = document.querySelector('.split-text');
            if (window.scrollY > 50) {
                splitText.classList.add('scrolled');
            } else {
                splitText.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="Parallax">
            <Parallax pages={1} style={{ height: '100vh' }}>
                {/* Background Gradient */}
                <ParallaxLayer offset={0} speed={0.5} className="gradient-bg"></ParallaxLayer>

                {/* Splitting Text */}
                <ParallaxLayer offset={0} speed={0}>
                    <div className="split-text">
                        <div className="line">
                            <span className="text-left">Projects</span>
                            <span className="text-right">are stepping</span>
                        </div>
                        <div className="line">
                            <span className="text-left">stones to</span>
                            <span className="text-right">success</span>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
}

export default ParaAnimation;
