import type { ReactNode } from "react";
import { BrandPage, Hero, Ed, Rows, Steps, Stats, Faq, Versus, CtaFinal } from "./Sections";

type Item = { title: string; description: string };

/* Plantilla común de las landings por idioma y de hoteles: mismo contenido
   que antes, montado con los bloques de la home. */
export default function LanguageLanding(props: {
  heroTag: ReactNode;
  heroTitle: ReactNode;
  heroSub: ReactNode;
  heroCta: string;
  stats: { value: string; label: string }[];
  painTitle: ReactNode;
  painPoints: Item[];
  servicesTitle: ReactNode;
  services: Item[];
  stepsTitle: ReactNode;
  steps: { title: string; description: string }[];
  compareTitle: ReactNode;
  themLabel: ReactNode;
  them: string[];
  ours: string[];
  faq: { q: string; a: string }[];
  ctaTitle: ReactNode;
  ctaText: ReactNode;
}) {
  return (
    <BrandPage>
      <Hero tag={props.heroTag} title={props.heroTitle} sub={props.heroSub} cta={{ label: props.heroCta }} />
      <Ed tag="En cifras" flush>
        <Stats items={props.stats} />
      </Ed>
      <Ed tag="El problema" title={props.painTitle} flush={false}>
        <Rows cols={2} items={props.painPoints.map((p) => ({ title: p.title, desc: p.description }))} />
      </Ed>
      <Ed tag="Servicios" title={props.servicesTitle}>
        <Rows items={props.services.map((s) => ({ title: s.title, desc: s.description }))} />
      </Ed>
      <Ed tag="Cómo funciona" title={props.stepsTitle}>
        <Steps items={props.steps.map((s) => ({ title: s.title, desc: s.description }))} />
      </Ed>
      <Ed tag="La diferencia" title={props.compareTitle}>
        <Versus themLabel={props.themLabel} them={props.them} ours={props.ours} />
      </Ed>
      <Ed tag="Preguntas" title="FAQ">
        <Faq items={props.faq} />
      </Ed>
      <CtaFinal title={props.ctaTitle} text={props.ctaText} cta={{ label: props.heroCta }} />
    </BrandPage>
  );
}
