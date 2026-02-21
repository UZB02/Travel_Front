export function useUIEffects() {
    const scrollToTours = () => {
        document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
    }

    // 3D Tilt Effect Logic
    const handleTilt = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Calculate rotation
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -10 // Max 10 deg rotation
        const rotateY = ((x - centerX) / centerX) * 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    const resetTilt = (e) => {
        const card = e.currentTarget
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    // Scroll Animation Logic
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active')
                }
            })
        }, { threshold: 0.1 })

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }

    return {
        scrollToTours,
        handleTilt,
        resetTilt,
        observeElements
    }
}
