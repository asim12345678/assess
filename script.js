/* NorthStar Books Assessment 2 Part B: browser-only functional demonstration.
   No real customers or payment data. Storage is local to this browser. */
"use strict";
const KEY="northstar-crm-v2";
const rewardCatalog=[
{id:"voucher5",title:"$5 Book Voucher",cost:500,description:"Discount on a future eligible book order."},
{id:"shipping",title:"Free Shipping",cost:750,description:"Free delivery on a future eligible online order."},
{id:"voucher10",title:"$10 Book Voucher",cost:1000,description:"Discount on a future eligible book order."},
{id:"member",title:"15% Member Discount",cost:1500,description:"Percentage discount on one eligible order."},
{id:"bundle",title:"Curated Book Bundle",cost:2500,description:"Exchange points for a selected bundle."},
{id:"vip",title:"VIP Member Reward",cost:4000,description:"Exclusive member reward for loyal readers."}
];
const initialState=()=>({customers:[{id:"NS001",name:"Emily Carter",email:"emily@example.com",channel:"Email",points:750},{id:"NS002",name:"James Wilson",email:"james@example.com",channel:"SMS",points:300},{id:"NS003",name:"Olivia Brown",email:"olivia@example.com",channel:"In-store",points:1200}],transactions:[]});
function load(){try{const raw=localStorage.getItem(KEY);if(!raw)return initialState();const parsed=JSON.parse(raw);if(!Array.isArray(parsed.customers)||!Array.isArray(parsed.transactions))throw Error("Invalid data");return parsed}catch(e){console.warn("Invalid local demo data; using starting records",e);return initialState()}}
let state=load();
const $=id=>document.getElementById(id),fmt=n=>Number(n).toLocaleString("en-AU"),money=n=>new Intl.NumberFormat("en-AU",{style:"currency",currency:"AUD"}).format(n),escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])),person=id=>state.customers.find(c=>c.id===id);
function save(){localStorage.setItem(KEY,JSON.stringify(state));render()}
function message(text,error=false){const el=$("alert");el.textContent=text;el.hidden=false;el.classList.toggle("error",error);el.scrollIntoView({behavior:"smooth",block:"nearest"})}
function page(name){document.querySelectorAll(".page").forEach(el=>el.classList.toggle("visible",el.id===name));document.querySelectorAll(".nav").forEach(el=>el.classList.toggle("active",el.dataset.page===name));const names={dashboard:"Customer overview",customers:"Customer profiles",purchases:"Book purchases",rewards:"Loyalty rewards",activity:"Activity log"};$("pageTitle").textContent=names[name];$("crumb").textContent=names[name];$("alert").hidden=true;window.scrollTo({top:0,behavior:"smooth"})}
function record(customerId,type,label,points,amount=0){state.transactions.unshift({id:"TX"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),customerId,type,label,points,amount,createdAt:new Date().toISOString()})}
function render(){
 $("statCustomers").textContent=fmt(state.customers.length);
 $("statPoints").textContent=fmt(state.customers.reduce((s,c)=>s+c.points,0));
 $("statRevenue").textContent=money(state.transactions.filter(t=>t.type==="purchase").reduce((s,t)=>s+t.amount,0));
 $("statRewards").textContent=fmt(state.transactions.filter(t=>t.type==="reward").length);
 const options=state.customers.map(c=>'<option value="'+escapeHTML(c.id)+'">'+escapeHTML(c.name)+' ('+c.id+')</option>').join("");
 for(const key of ["purchaseCustomer","rewardCustomer"]){const el=$(key),before=el.value;el.innerHTML=options||'<option value="">No customers yet</option>';if(state.customers.some(c=>c.id===before))el.value=before}
 const q=$("customerSearch").value.trim().toLowerCase(),filtered=state.customers.filter(c=>[c.id,c.name,c.email].some(v=>v.toLowerCase().includes(q)));
 $("customerRows").innerHTML=filtered.map(c=>'<tr><td><strong>'+escapeHTML(c.name)+'</strong><small>'+escapeHTML(c.email)+' · '+c.id+'</small></td><td>'+escapeHTML(c.channel)+'</td><td>'+fmt(c.points)+'</td><td>'+state.transactions.filter(t=>t.customerId===c.id&&t.type==="purchase").length+'</td></tr>').join("")||'<tr><td colspan="4">No matching customers.</td></tr>';
 const sales=state.transactions.filter(t=>t.type==="purchase");
 $("purchaseRows").innerHTML=sales.slice(0,12).map(t=>'<tr><td>'+escapeHTML(person(t.customerId)?.name||t.customerId)+'</td><td>'+escapeHTML(t.label)+'</td><td>'+money(t.amount)+'</td><td>+'+fmt(t.points)+'</td></tr>').join("")||'<tr><td colspan="4" class="empty">Record a purchase to see it here.</td></tr>';
 $("activityRows").innerHTML=state.transactions.map(t=>'<tr><td>'+new Date(t.createdAt).toLocaleString("en-AU")+'</td><td>'+escapeHTML(person(t.customerId)?.name||t.customerId)+'</td><td>'+escapeHTML(t.type==="purchase"?"Purchase · "+t.label:"Redeemed · "+t.label)+'</td><td>'+(t.points>0?"+":"")+fmt(t.points)+'</td></tr>').join("")||'<tr><td colspan="4" class="empty">No activity yet.</td></tr>';
 $("recentActivity").innerHTML=state.transactions.slice(0,5).map(t=>'<div class="event"><span>'+escapeHTML(person(t.customerId)?.name||t.customerId)+' · '+escapeHTML(t.label)+'</span><strong>'+(t.points>0?"+":"")+fmt(t.points)+' pts</strong></div>').join("")||'<p class="empty">No activity recorded. Try the purchase workflow.</p>';
 const selected=person($("rewardCustomer").value);$("rewardBalance").textContent=fmt(selected?.points||0)+" pts";
 $("rewardGrid").innerHTML=rewardCatalog.map(r=>'<article><small class="eyebrow">MEMBER REWARD</small><h3>'+escapeHTML(r.title)+'</h3><p>'+escapeHTML(r.description)+'</p><strong>'+fmt(r.cost)+' points</strong><button class="primary redeem" data-reward="'+r.id+'" '+(!selected||selected.points<r.cost?"disabled":"")+'>'+(selected?.points>=r.cost?"Redeem reward":"Not enough points")+'</button></article>').join("");
 updatePreview()
}
function updatePreview(){const n=Number($("purchaseAmount").value);$("pointsPreview").textContent=(Number.isFinite(n)&&n>0?fmt(Math.floor(Math.round(n*100)/10)):"0")+" pts"}
document.querySelectorAll(".nav").forEach(b=>b.addEventListener("click",()=>page(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>page(b.dataset.goto)));
$("customerSearch").addEventListener("input",render);
$("rewardCustomer").addEventListener("change",render);
$("purchaseAmount").addEventListener("input",updatePreview);
$("customerForm").addEventListener("submit",e=>{e.preventDefault();const name=$("customerName").value.trim().replace(/\s+/g," "),email=$("customerEmail").value.trim().toLowerCase(),channel=$("customerChannel").value;if(name.length<2||!/^\S+@\S+\.\S+$/.test(email)){message("Enter a valid name and email address.",true);return}if(state.customers.some(c=>c.email.toLowerCase()===email)){message("This email is already registered.",true);return}const next=Math.max(0,...state.customers.map(c=>Number(c.id.slice(2))||0))+1;state.customers.push({id:"NS"+String(next).padStart(3,"0"),name,email,channel,points:0});save();e.target.reset();message("Customer saved. You can now record a book purchase.")});
$("purchaseForm").addEventListener("submit",e=>{e.preventDefault();const c=person($("purchaseCustomer").value),title=$("bookTitle").value.trim(),input=$("purchaseAmount").value,amount=Number(input);if(!c||!title||!input||!Number.isFinite(amount)||amount<=0||amount>10000||Math.round(amount*100)!==amount*100&&Math.abs(Math.round(amount*100)-amount*100)>1e-6){message("Select a customer, enter a book and use an amount from $0.01 to $10,000.00 with at most two decimal places.",true);return}const cents=Math.round(amount*100),points=Math.floor(cents/10);c.points+=points;record(c.id,"purchase",title,points,cents/100);save();$("bookTitle").value="";$("purchaseAmount").value="";message("Purchase recorded. "+fmt(points)+" loyalty points credited to "+c.name+".")});
$("rewardGrid").addEventListener("click",e=>{const btn=e.target.closest("[data-reward]");if(!btn)return;const c=person($("rewardCustomer").value),r=rewardCatalog.find(r=>r.id===btn.dataset.reward);if(!c||!r)return;if(c.points<r.cost){message("Insufficient loyalty points.",true);return}if(!window.confirm("Redeem "+r.title+" for "+fmt(r.cost)+" points from "+c.name+"?"))return;c.points-=r.cost;record(c.id,"reward",r.title,-r.cost);save();message("Reward redeemed. "+fmt(r.cost)+" points deducted from "+c.name+".")});
$("resetDemo").addEventListener("click",()=>{if(!window.confirm("Delete all saved demonstration changes and restore sample customers?"))return;state=initialState();save();message("Sample data restored.")});
render();
