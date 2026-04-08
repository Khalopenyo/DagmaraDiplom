export default function App() {
  return (
    <main className="intro-stage">
      <div className="intro-orbit intro-orbit-left" aria-hidden="true" />
      <div className="intro-orbit intro-orbit-right" aria-hidden="true" />

      <section className="intro-card">
        <div className="intro-eyebrow">
          <span className="intro-dot" aria-hidden="true" />
          Dagmara
        </div>

        <h1 className="intro-title">
          Платформа демонстрации трансграничных переводов в цифровых валютах ЦБ
        </h1>

        <p className="intro-copy">
          This is a frontend-only demo shell for the diploma MVP. Реального
          движения денег, live-курсов и официальных интеграций с центральными
          банками здесь нет.
        </p>

        <p className="intro-note">
          Навигация, routed-экраны и сценарий перевода подключаются в следующем
          плане.
        </p>
      </section>
    </main>
  )
}
