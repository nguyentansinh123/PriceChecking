import cloudImage from '@/assets/cloud.png'

interface SidebarGraphicProps {
  variant: 'login' | 'register'
}

const SidebarGraphic = ({ variant }: SidebarGraphicProps) => {
  const isLogin = variant === 'login'
  const clipPath = isLogin
    ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
    : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'

  const cloudPositions = isLogin
    ? [
        { top: 30, left: -150, w: 400, o: 0.9 },
        { top: -60, left: 320, w: 420, o: 0.8 },
        { bottom: -30, left: -120, w: 480, o: 0.7 },
        { bottom: 180, left: 200, w: 490, o: 0.8 },
      ]
    : [
        { top: 30, left: -150, w: 400, o: 0.9 },
        { top: -60, left: 320, w: 420, o: 0.8 },
        { bottom: -30, left: -120, w: 480, o: 0.7 },
        { bottom: 180, left: 200, w: 490, o: 0.8 },
      ]

  return (
    <div
      className="flex-[7] flex items-center justify-center relative overflow-hidden"
      style={{ background: '#00004C', clipPath }}
    >
      {cloudPositions.map((p, i) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          ...(p.top != null ? { top: p.top } : { bottom: p.bottom }),
          left: p.left,
          width: p.w,
          opacity: p.o,
        }
        return <img key={i} src={cloudImage} alt="cloud" style={style} />
      })}

      <span className="text-white text-4xl font-bold z-10">Logo Here</span>

      <div
        className="absolute top-0 h-full w-[80px] pointer-events-none"
        style={{
          ...(isLogin
            ? { right: -40, borderRadius: '0 40px 40px 0' }
            : { left: -40, borderRadius: '40px 0 0 40px' }),
          background: isLogin
            ? 'linear-gradient(120deg, rgba(0,0,0,0.09) 25%, rgba(0,0,0,0) 75%)'
            : 'linear-gradient(-120deg, rgba(0,0,0,0.09) 25%, rgba(0,0,0,0) 75%)',
          filter: 'blur(6px)',
        }}
      />
    </div>
  )
}

export default SidebarGraphic