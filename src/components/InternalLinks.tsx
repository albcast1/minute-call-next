import Link from 'next/link'

const TOP_CITIES=[
  ['Madrid','madrid'],['Barcelona','barcelona'],['Valencia','valencia'],
  ['Sevilla','sevilla'],['Málaga','malaga'],['Bilbao','bilbao'],
  ['Zaragoza','zaragoza'],['Murcia','murcia'],['Palma de Mallorca','palma-de-mallorca'],
  ['Las Palmas','las-palmas'],['Alicante','alicante'],['Valladolid','valladolid'],
] as const

const TOP_SECTORS=[
  ['Secretaria virtual','/lp/secretaria-virtual'],
  ['Recepción de llamadas','/lp/recepcion-de-llamadas'],
  ['Para clínicas','/lp/recepcionista-ia-clinicas'],
  ['Para abogados','/lp/recepcionista-ia-abogados'],
  ['Para inmobiliarias','/lp/recepcionista-ia-inmobiliarias'],
  ['Para asesorías','/lp/recepcionista-ia-asesorias'],
  ['Para restaurantes','/lp/recepcionista-ia-restaurantes'],
  ['Call center empresas','/lp/call-center-para-empresas'],
  ['Atención 24 horas','/lp/call-center-24-horas'],
  ['Outsourcing atención cliente','/lp/outsourcing-atencion-cliente'],
] as const

export function InternalLinks() {
  return (
    <section aria-label="Directorio de servicios por ciudad y sector" className="mc-reset">
      <div className="wrap">
        <div className="seo">
          <div>
            <h4><span className="tag">Atención telefónica por ciudad</span></h4>
            <div className="lk">
              {TOP_CITIES.map(([name,slug])=>(
                <Link key={slug} href={`/atencion-telefonica/${slug}`} title={`Atención telefónica en ${name}`}>
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4><span className="tag">Servicios por sector</span></h4>
            <div className="lk">
              {TOP_SECTORS.map(([name,href])=>(
                <Link key={href} href={href}>{name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
