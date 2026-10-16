// Compressed WebP groups remove one round trip per frame. Decoding stays bounded
// in the players; the individual originals remain a fallback for interrupted packs.
export function createFlightBuffer(){
 const base=new URL('./assets/flight-v1/',import.meta.url);
 const packs=new Map(),pending=new Map(),failed=new Map();
 const manifest=fetch(new URL('buffer.json?v=20261016',base))
  .then(r=>{if(!r.ok)throw new Error('Flight manifest '+r.status);return r.json()})
  .catch(()=>null);
 return async function frameBlob(index){
  const data=await manifest;
  const pack=data?.packs.find(p=>index>=p.start&&index<p.start+p.frames.length);
  if(pack&&Date.now()-(failed.get(pack.start)||0)>5000){
   try{
    let blob=packs.get(pack.start);
    if(!blob){
     if(!pending.has(pack.start)){
      const request=fetch(new URL(pack.file,base),{priority:pack.start===0?'high':'auto',signal:AbortSignal.timeout(60000)})
       .then(r=>{if(!r.ok)throw new Error('Flight buffer '+r.status);return r.blob()})
       .then(b=>{if(b.size!==pack.bytes)throw new Error('Incomplete flight buffer');packs.set(pack.start,b);return b})
       .catch(error=>{failed.set(pack.start,Date.now());throw error})
       .finally(()=>pending.delete(pack.start));
      pending.set(pack.start,request);
     }
     blob=await pending.get(pack.start);
    }
    const [offset,length]=pack.frames[index-pack.start];
    return blob.slice(offset,offset+length,'image/webp');
   }catch{/* A failed group must not remove the animation. */}
  }
  const response=await fetch(new URL('frame-'+String(index).padStart(3,'0')+'.webp',base));
  if(!response.ok)throw new Error('Flight frame '+index+': '+response.status);
  return response.blob();
 };
}
