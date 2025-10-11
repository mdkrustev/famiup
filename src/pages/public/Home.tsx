import { t } from "../../utils/i18n";
import "../../styles/homePage.css";
import { useUser } from "../../hooks/useUser";
import { Calendar1Icon, Gamepad2Icon, User2Icon, WorkflowIcon } from "lucide-react";

export default function HomePage() {
  const { login } = useUser();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-wave-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="hero-wave">
            <path
              fill="var(--bg)"
              fillOpacity="0.2"
              d="M0,64L40,101.3C80,139,160,213,240,224C320,235,400,181,480,160C560,139,640,149,720,176C800,203,880,245,960,250.7C1040,256,1120,224,1200,197.3C1280,171,1360,149,1400,138.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            />
          </svg>
        </div>
        <div className="home-main-content">
          <h1>{t.homePage.MainTitle}</h1>
          <p>{t.homePage.Tagline}</p>
          <button onClick={login} className="btn-primary">{t.homePage.GetStarted}</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>{t.homePage.FeaturesTitle}</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3><WorkflowIcon size={20} /> {t.homePage.FeatureTasks}</h3>
            <p>{t.homePage.FeatureTasksDesc}</p>
          </div>
          <div className="feature-card">
            <h3><Calendar1Icon size={20} /> {t.homePage.FeatureCalendar}</h3>
            <p>{t.homePage.FeatureCalendarDesc}</p>
          </div>
          <div className="feature-card">
            <h3><User2Icon size={20} /> {t.homePage.FeatureMembers}</h3>
            <p>{t.homePage.FeatureMembersDesc}</p>
          </div>
          <div className="feature-card">
            <h3><Gamepad2Icon size={20} /> {t.homePage.FeatureGamification}</h3>
            <p>{t.homePage.FeatureGamificationDesc}</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>{t.homePage.HowItWorksTitle}</h2>
        <ol>
          <li>{t.homePage.Step1}</li>
          <li>{t.homePage.Step2}</li>
          <li>{t.homePage.Step3}</li>
        </ol>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>{t.homePage.CTA}</h2>
        <button onClick={login} className="btn-primary">{t.homePage.SignUpFree}</button>
      </section>

      <footer>{t.homePage.Footer}</footer>
    </div>
  );
}