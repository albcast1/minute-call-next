import Link from 'next/link'

const TOP_CITIES=[
  ['Madrid','madrid'],['Barcelona','barcelona'],['Valencia','valencia'],
  ['Sevilla','sevilla'],['Malaga','malaga'],['Bilbao','bilbao'],
  ['Zaragoza','zaragoza'],['Murcia','murcia'],['Palma de Mallorca','palma-de-mallorca'],
  ['Las Palmas','las-palmas'],['Alicante','alicante'],['Valladolid','valladolid'],
] as const

const TOP_SECTORS=[
  ['Secretaria virtual','/lp/secretaria-virtual'],
  ['Recepcion de llamadas','/lp/recepcion-de-llamadas'],
  ['Para clinicas','/lp/recepcionista-ia-clinicas'],
  ['Para abogados','/lp/recepcionista-ia-abogados'],
  ['Para inmobiliarias','/lp/recepcionista-ia-inmobiliarias'],
  ['Para asesorias','/lp/recepcionista-ia-asesorias'],
  ['Para restaurantes','/lp/recepcionista-ia-restaurantes'],
  ['Call center empresas','/lp/call-center-para-empresas'],
  ['Atencion 24 horas','/lp/call-center-24-horas'],
  ['Outsourcing atencion cliente','/lp/outsourcing-atencion-cliente'],
] as const

export function InternalLinks() {
  return (
    <section aria-label="Directorio de servicios por ciudad y sector" style={{
      background:'#EFEBE5', padding:'40px 24px', borderTop:'1px solid #e5e5e5'
    }}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <p style={{fontSize:13,fontWeight:700,color:'#888',letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:16}}>
          Atencion telefonica por ciudad
        </p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px 24px',marginBottom:32}}>
          {TOP_CITIES.map(([name,slug])=>(
            <Link key={slug} href={`/atencion-telefonica/${slug}`}
              style={{fontSize:13,color:'#555',textDecoration:'none'}}
              title={`Atencion telefonica en ${name}`}>
              {name}
            </Link>
          ))}
        </div>
        <p style={{fontSize:13,fontWeight:700,color:'#888',letterSpacing:'0.05em',textTransform:'uppercase',marginBottom:16}}>
          Servicios por sector
        </p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px 24px'}}>
          {TOP_SECTORS.map(([name,href])=>(
            <Link key={href} href={href}
              style={{fontSize:13,color:'#555',textDecoration:'none'}}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
