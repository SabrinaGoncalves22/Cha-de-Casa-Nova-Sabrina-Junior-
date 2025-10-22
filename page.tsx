"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Item = { id:string; nome:string; imagem?:string; quantidade:number; reservado:number };

const HOST_CODE = "sabrina-e-junior-2025";
const LS_ITEMS = "ccn_items_v3";
const LS_HOST = "ccn_host_v1";
const PLACEHOLDER = "https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=1200&auto=format&fit=crop";

function sampleItems(): Item[] {
  const make = (nome:string, imagem:string, quantidade:number)=>({ id: crypto.randomUUID(), nome, imagem, quantidade, reservado:0 });
  return [
    make("Jogo de Talheres","https://images.unsplash.com/photo-1526313199968-70e399ffe597?q=80&w=1200&auto=format&fit=crop",2),
    make("Jogo de Utensílios de cozinha (silicone)","https://images.unsplash.com/photo-1604335399105-a0c4e3d12b83?q=80&w=1200&auto=format&fit=crop",2),
    make("Liquidificador","https://images.unsplash.com/photo-1622473590775-4a9d8a9c67fb?q=80&w=1200&auto=format&fit=crop",1),
    make("Jogo de facas","https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=1200&auto=format&fit=crop",2),
    make("Microondas","https://images.unsplash.com/photo-1599599810763-3d5b0a76e095?q=80&w=1200&auto=format&fit=crop",1),
    make("Forno de embutir a gás","https://images.unsplash.com/photo-1621313095021-efbfc6668e68?q=80&w=1200&auto=format&fit=crop",1),
    make("Lixeira para pia","https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",1),
    make("Panela de pressão","https://images.unsplash.com/photo-1556911220-e15b29be8cdd?q=80&w=1200&auto=format&fit=crop",2),
    make("Colheres de pau","https://images.unsplash.com/photo-1595436252086-2365f6d8d6b1?q=80&w=1200&auto=format&fit=crop",2),
    make("Potes Herméticos de vidro","https://images.unsplash.com/photo-1622206151222-18d4ad182e83?q=80&w=1200&auto=format&fit=crop",3),
    make("Potes Herméticos de plástico","https://images.unsplash.com/photo-1596040033229-4f4e6b1ef51f?q=80&w=1200&auto=format&fit=crop",3),
    make("Jogo de copos","https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",3),
    make("Jogo de pratos","https://images.unsplash.com/photo-1560200353-ce0a76b1d438?q=80&w=1200&auto=format&fit=crop",3),
    make("Pratos de sobremesa","https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",2),
    make("Jogo de forma","https://images.unsplash.com/photo-1514517220035-41d0a1f0b6b7?q=80&w=1200&auto=format&fit=crop",2),
    make("Boleira","https://images.unsplash.com/photo-1551022370-1b3c6a3d7c31?q=80&w=1200&auto=format&fit=crop",2),
    make("Jogo de Canecas","https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop",2),
    make("Jogo de Xícaras","https://images.unsplash.com/photo-1517705929775-6f87a0f8b7f6?q=80&w=1200&auto=format&fit=crop",2),
    make("Tábuas de carne","https://images.unsplash.com/photo-1606756790138-2613b47b435b?q=80&w=1200&auto=format&fit=crop",2),
    make("Faqueiro","https://images.unsplash.com/photo-1622403800889-df5bdcf0584c?q=80&w=1200&auto=format&fit=crop",1),
    make("Jogo de Panelas","https://images.unsplash.com/photo-1532634896-26909d0d4b6a?q=80&w=1200&auto=format&fit=crop",2),
    make("Porta mantimentos herméticos","https://images.unsplash.com/photo-1604335399105-a0c4e3d12b83?q=80&w=1200&auto=format&fit=crop",2),
    make("Sanduicheira","https://images.unsplash.com/photo-1526312426976-593c2ebaa8c0?q=80&w=1200&auto=format&fit=crop",1),
    make("Chaleira elétrica","https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop",1),
    make("Porta temperos","https://images.unsplash.com/photo-1602002417840-9b5526f3b0f5?q=80&w=1200&auto=format&fit=crop",2),
    make("Espremedor de batata","https://images.unsplash.com/photo-1596033776115-27b525047a44?q=80&w=1200&auto=format&fit=crop",1),
    make("Jogo americano","https://images.unsplash.com/photo-1564869737593-5a7e9e8123b2?q=80&w=1200&auto=format&fit=crop",2),
    make("Escorredor de louça de inox","https://images.unsplash.com/photo-1616406432780-51a101c297dd?q=80&w=1200&auto=format&fit=crop",1),
    make("Garrafa de café","https://images.unsplash.com/photo-1536935339740-689d7b4e4d34?q=80&w=1200&auto=format&fit=crop",1),
    make("Garrafa de água de vidro","https://images.unsplash.com/photo-1600271886732-acaea40a657b?q=80&w=1200&auto=format&fit=crop",2),
    make("Jarra de suco","https://images.unsplash.com/photo-1584568694244-85a67b4b22e1?q=80&w=1200&auto=format&fit=crop",2),
    make("Travessas de vidro","https://images.unsplash.com/photo-1604053896283-46f2bb0b5d5d?q=80&w=1200&auto=format&fit=crop",2),
    make("Aparelho de jantar","https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",2),
    make("Potes de plástico","https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",5),
    // Quarto
    make("Jogo de cama","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",3),
    make("Conjunto de Lençóis","https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",3),
    make("Travesseiros","https://images.unsplash.com/photo-1617093727343-374698b1d3f8?q=80&w=1200&auto=format&fit=crop",2),
    make("Edredom","https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",2),
    make("Cobertor","https://images.unsplash.com/photo-1533777168198-c0dcb04f8392?q=80&w=1200&auto=format&fit=crop",2),
    make("Cobre leito","https://images.unsplash.com/photo-1595526114035-7815d51384ec?q=80&w=1200&auto=format&fit=crop",2),
    make("Quadros decorativos","https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",2),
    make("Aspirador de pó","https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop",1),
    make("Par de mesas de cabeceira","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",1),
    // Banheiro
    make("Toalhas de banho","https://images.unsplash.com/photo-1582582621959-48d8f1a1a587?q=80&w=1200&auto=format&fit=crop",2),
    make("Toalhas de rosto","https://images.unsplash.com/photo-1582582622632-1f1b09acb3b5?q=80&w=1200&auto=format&fit=crop",2),
    make("Porta shampoo, condicionador e sabonete","https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop",2),
    make("MOP","https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",1),
    make("Cesto para roupa","https://images.unsplash.com/photo-1604335399515-c7c1d0d8f6d8?q=80&w=1200&auto=format&fit=crop",1),
    make("Tapete antiaderente para box","https://images.unsplash.com/photo-1560185008-b033106af2fb?q=80&w=1200&auto=format&fit=crop",2),
    make("Lixeira de banheiro","https://images.unsplash.com/photo-1600585154340-1eafe6e3a2b6?q=80&w=1200&auto=format&fit=crop",1),
  ];
}

function load(): Item[] {
  try { const raw = localStorage.getItem(LS_ITEMS); return raw? JSON.parse(raw): sampleItems(); }
  catch { return sampleItems(); }
}
function save(items: Item[]) { localStorage.setItem(LS_ITEMS, JSON.stringify(items)); }

export default function Page(){
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const [openRSVP, setOpenRSVP] = useState(false);
  const [nome, setNome] = useState(""); const [recado, setRecado] = useState("");
  useEffect(()=>{ setItems(load()); },[]);
  useEffect(()=>{ save(items); },[items]);
  const filtered = useMemo(()=> items.filter(i=>i.quantidade-i.reservado>0).filter(i=> i.nome.toLowerCase().includes(query.toLowerCase())), [items,query]);

  function reservar(id:string, qtd:number){
    setItems(prev => prev.map(i=> i.id===id ? {...i, reservado: Math.min(i.quantidade, i.reservado+qtd)} : i));
    alert("Presente reservado! Obrigado pelo carinho ♥");
  }

  async function enviarRSVP(){
    if(!nome.trim()){ alert("Digite seu nome para confirmar."); return; }
    const res = await fetch("/api/rsvp", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ nome, recado }) });
    if(res.ok){ alert("Presença confirmada!"); setOpenRSVP(false); setNome(""); setRecado(""); }
    else alert("Não foi possível enviar agora.");
  }

  return (
    <div className="relative min-h-screen">
      <ParallaxBg />
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="container py-3 flex items-center gap-3">
          <span className="font-semibold">Chá de Casa Nova – Sabrina & Junior 💍</span>
          <input className="input ml-auto w-60" placeholder="Buscar presente..." value={query} onChange={e=>setQuery(e.target.value)} />
          <button className="btn btn-primary ml-2" onClick={()=>setOpenRSVP(true)}>Confirmar presença</button>
        </div>
      </header>

      <main>
        <section className="container my-8">
          <div className="card p-6 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Bem-vindo(a)</h2>
              <p>Se você recebeu este convite, é porque faz parte da nossa história. Aqui você pode escolher um presente com carinho. Ao reservar um item, ele sai da lista quando atingir a quantidade — assim evitamos repetições.</p>
            </div>
            <img className="rounded-xl w-full h-56 object-cover" alt="Mesa posta" src="https://images.unsplash.com/photo-1541542684-4a7a96dbf221?q=80&w=1600&auto=format&fit=crop" />
          </div>
        </section>

        <section className="container my-4">
          <h3 className="text-xl font-semibold mb-3">Lista de presentes</h3>
          {filtered.length===0 ? <p className="opacity-70 py-10 text-center">Nenhum item disponível no momento.</p> : (
            <div className="grid3">
              {filtered.map(it=>{
                const disponivel = it.quantidade - it.reservado;
                return (
                  <div key={it.id} className="card overflow-hidden flex flex-col">
                    <img src={it.imagem || PLACEHOLDER} alt={it.nome} className="w-full h-48 object-cover" />
                    <div className="p-4 flex-1 flex flex-col gap-3">
                      <div className="text-lg font-semibold">{it.nome}</div>
                      <div className="flex items-center gap-2">
                        <span className="badge">Disponível: {disponivel}</span>
                        <span className="badge">Total: {it.quantidade}</span>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <button className="btn btn-primary flex-1" disabled={disponivel===0} onClick={()=>{
                          const val = prompt(`Quantas unidades deseja reservar? (1-${disponivel})`,"1");
                          const qtd = Math.max(1, Math.min(disponivel, parseInt(val||"1")));
                          reservar(it.id, qtd);
                        }}>Reservar</button>
                        <button className="btn btn-outline" onClick={()=>{
                          if(navigator.share) navigator.share({ title: it.nome, url: location.href });
                          else navigator.clipboard.writeText(location.href).then(()=>alert("Link copiado!"));
                        }}>Compartilhar</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {openRSVP && (
          <div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center p-4">
            <div className="card p-6 w-full max-w-md">
              <h4 className="text-lg font-semibold mb-3">Confirmar presença</h4>
              <div className="text-left space-y-3">
                <div>
                  <label className="block text-sm mb-1">Seu nome *</label>
                  <input className="input" value={nome} onChange={e=>setNome(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Recado (opcional)</label>
                  <textarea className="input" rows={4} value={recado} onChange={e=>setRecado(e.target.value)} />
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="btn btn-primary flex-1" onClick={enviarRSVP}>Confirmar</button>
                  <button className="btn btn-outline flex-1" onClick={()=>setOpenRSVP(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="py-10 text-center opacity-70">
          Feito com carinho para o nosso Chá de Casa Nova. Obrigado pela presença!
        </footer>
      </main>
    </div>
  );
}

function ParallaxBg(){
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -30]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -60]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -100]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -top-24 -left-20 w-[28rem] h-[28rem] rounded-full bg-[#f0e8df] opacity-25" />
      <motion.div style={{ y: y2 }} className="absolute -bottom-40 -right-24 w-[34rem] h-[34rem] rounded-full bg-[#e8d5d0] opacity-25" />
      <motion.div style={{ y: y3 }} className="absolute top-1/3 -right-10 w-[22rem] h-[22rem] rounded-full bg-[#d9b26b] opacity-20" />
    </div>
  );
}
