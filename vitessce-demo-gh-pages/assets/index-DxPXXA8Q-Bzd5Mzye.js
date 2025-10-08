import{L as I,r as _,aC as be,aD as _e,aE as ve,a3 as ee,I as Re,ak as ye,s as Ee,b,a as Se,aF as Ce,aG as o,aH as Te,$ as ze,aI as we,f as R,h as V,t as ke,l as D,aJ as ne,V as ie,U as De,o as se,aK as Ie,aL as Me,aM as oe}from"./index-D9chyKeb.js";import{v as Pe,K as ce,A as Ae,a as le}from"./OrbitControls-DuFHF-v2-DcFGr2Is.js";const T=32,k=64,L=64,ae=4,re=k*L*ae,ue=k*T,he=L*T,fe=ae*T,G={NOT_STARTED:"not_started",IN_PROGRESS:"in_progress",COMPLETE:"complete",FAILED:"failed"};function M(h){ne(oe.DEBUG)&&console.warn(`%cDM: ${h}`,"background: blue; color: white; padding: 2px; border-radius: 3px;")}function Be(h){return h.map(t=>{const{dims:e}=t;return[e.t,e.c,e.z,e.y,e.x]})}function Ne(h){return h.map(t=>{const e=[t.depth,t.height,t.width];return[Math.ceil((e[0]||1)/T),Math.ceil((e[1]||1)/T),Math.ceil((e[2]||1)/T)]})}function Ue(h,t){o.debug("_initMRMCPT",h,t);const e={channelOffsets:[[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]],anchors:[],offsets:[],xExtent:0,yExtent:0,zExtent:0,z0Extent:0,zTotal:0};e.xExtent=1,e.yExtent=1,e.zExtent=1;const n=h[0][0];e.z0Extent=n,e.lowestDataRes=h.length-1;for(let u=h.length-1;u>0;u--)e.anchors.push([e.xExtent,e.yExtent,e.zExtent]),e.xExtent+=h[u][2],e.yExtent+=h[u][1],e.zExtent+=h[u][0];e.anchors.push([0,0,e.zExtent]),e.anchors.reverse(),e.zTotal=e.zExtent+t*n;const a=new Uint8Array(ue*he*fe);a.fill(0);const r=new Uint32Array(e.xExtent*e.yExtent*e.zTotal);r.fill(0);const i=new ie(a,ue,he,fe);i.format=De,i.type=ve,i.internalFormat="R8",i.minFilter=se,i.magFilter=se,i.generateMipmaps=!1,i.needsUpdate=!0;const s=new ie(r,e.xExtent,e.yExtent,e.zTotal);return s.format=Ie,s.type=Me,s.internalFormat="R32UI",s.minFilter=ee,s.magFilter=ee,s.generateMipmaps=!1,s.needsUpdate=!0,o.debug("_initMRMCPT",e,s,i),{PT:e,ptTHREE:s,bcTHREE:i}}function Le(h,t,e,n,a){const r=i=>Math.max(0,Math.min(127,Math.floor(i/2)));return(1<<31|1<<30|r(h)<<23|r(t)<<16|(e&63)<<10|(n&63)<<4|a&15)>>>0}function Oe(h,t,e,n){const{PT_zExtent:a,PT_z0Extent:r,PT_anchors:i}=n;let s=-1,u=-1,c=-1,g=-1,m=-1;if(e>=a)u=0,c=h,g=t,m=(e-a)%r,s=Math.floor((e-a)/r);else for(let l=1;l<i.length;l++)if(!(h<i[l][0]&&t<i[l][1]&&e<i[l][2])){u=l;const d=[0,0,0];h>=i[l][0]&&(d[0]=1),t>=i[l][1]&&(d[1]=1),e>=i[l][2]&&(d[2]=1);const v=d[0]<<2|d[1]<<1|d[2];s=Math.max(1,Math.min(7,v))-1;const f=d.map((x,E)=>x*i[l][E]);c=h-f[0],g=t-f[1],m=e-f[2];break}return{channel:s,resolution:u,x:c,y:g,z:m}}function Fe(h,t){const e=new Map;for(let n=0;n<h.length;n+=4){const a=h[n],r=h[n+1],i=h[n+2],s=h[n+3];if((a|r|i|s)===0)continue;const u=(a<<24|r<<16|i<<8|s)>>>0;e.set(u,(e.get(u)||0)+1)}return{requests:[...e.entries()].sort((n,a)=>a[1]-n[1]).slice(0,t).map(([n])=>({x:n>>22&1023,y:n>>12&1023,z:n&4095})),origRequestCount:e.size}}class Ve{constructor(t){M("CLASS INITIALIZING");const e=t.getContext?.()||t,n=t;e.domElement&&e.getContext?this.gl=e.getContext():e.isWebGLRenderer?this.gl=e.getContext():this.gl=e,this.renderer=n,(!this.gl||typeof this.gl.getParameter!="function")&&(o.debug("Unable to get WebGL context, using mock context"),this.gl={getParameter:a=>({MAX_TEXTURE_SIZE:4096,MAX_3D_TEXTURE_SIZE:256,MAX_RENDERBUFFER_SIZE:4096,MAX_UNIFORM_BUFFER_BINDINGS:16})[a]||0,MAX_TEXTURE_SIZE:"MAX_TEXTURE_SIZE",MAX_3D_TEXTURE_SIZE:"MAX_3D_TEXTURE_SIZE",MAX_RENDERBUFFER_SIZE:"MAX_RENDERBUFFER_SIZE",MAX_UNIFORM_BUFFER_BINDINGS:"MAX_UNIFORM_BUFFER_BINDINGS"}),o.debug("GL CONSTANTS"),o.debug(this.gl),o.debug(this.gl.TEXTURE0),o.debug(this.gl.textures),o.debug("RENDERER"),o.debug(this.renderer),this.deviceLimits={maxTextureSize:this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE),max3DTextureSize:this.gl.getParameter(this.gl.MAX_3D_TEXTURE_SIZE),maxRenderbufferSize:this.gl.getParameter(this.gl.MAX_RENDERBUFFER_SIZE),maxUniformBufferBindings:this.gl.getParameter(this.gl.MAX_UNIFORM_BUFFER_BINDINGS)},this.zarrStore={resolutions:null,chunkSize:[],shapes:[],arrays:[],dtype:"",physicalSizeTotal:[],physicalSizeVoxel:[],brickLayout:[],channelCount:1,scales:[],lowestDataRes:0},this.ptTHREE=null,this.bcTHREE=null,this.channels={maxChannels:7,zarrMappings:[],colorMappings:[],downsampleMin:[],downsampleMax:[]},this.PT={channelOffsets:[[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]],anchors:[],offsets:[],xExtent:0,yExtent:0,zExtent:0,z0Extent:0,zTotal:0},this.bricksEverLoaded=new Set,this.isBusy=!1,this.BCTimeStamps=new Array(re).fill(0),this.BCMinMax=new Array(re).fill([0,0]),this.BCFull=!1,this.BCUnusedIndex=0,this.bc2pt=new Array(re).fill(null),this.LRUStack=[],this.triggerUsage=!0,this.triggerRequest=!1,this.timeStamp=0,this.k=40,this.noNewRequests=!1,this.needsBailout=!1,this.initStatus=G.NOT_STARTED,this.initError=null,M("VolumeDataManager constructor complete")}initImages(t,e){M("INIT IMAGES"),this.images=t,this.imageLayerScopes=e}async init(t){if(M("INIT()"),this.initStatus!==G.NOT_STARTED)return o.debug("VolumeDataManager init() was called more than once!"),this.initStatus===G.COMPLETE?{success:!0,deviceLimits:this.deviceLimits,zarrStore:this.zarrStore,physicalSizeTotal:this.zarrStore.physicalSizeTotal,physicalSizeVoxel:this.zarrStore.physicalSizeVoxel,error:null}:this.initStatus===G.FAILED?{success:!1,error:this.initError||"Unknown initialization error"}:{success:!1,pending:!0,error:"Initialization in progress"};this.initStatus=G.IN_PROGRESS,M("INIT() IN PROGRESS");try{const e=this.images?.[this.imageLayerScopes?.[0]]?.image?.instance;if(this.ngffMetadata=e.vivLoader.metadata,o.debug("ngffMetadata",this.ngffMetadata),!e||e.getType()!=="ome-zarr")throw new Error("Invalid imageWrapper or not an OME-Zarr image");const n=e.getMultiResolutionStats(),a=Be(n),r=n.length;this.zarrStore.resolutions=r;const i=e.getData();if(!Array.isArray(i)||i.length<1)throw new Error("Not a multiresolution loader");if(!we(i[0].labels,["t","c","z","y","x"]))throw new Error("Expected OME-Zarr data with dimensions [t, c, z, y, x]");o.debug("vivData",i);const s=i.map(c=>c._data),u=new Array(r).fill(null);if(s.length>0){const c=s[0];if(this.zarrStore={resolutions:r,chunkSize:c.chunks,shapes:a,arrays:s,dtype:c.dtype,physicalSizeTotal:[],physicalSizeVoxel:[],brickLayout:[],channelCount:a[0][1],scales:u},this.channels.colorMappings=new Array(Math.min(this.zarrStore.channelCount,7)).fill(-1),this.channels.zarrMappings=new Array(Math.min(this.zarrStore.channelCount,7)).fill(void 0),this.channels.downsampleMin=new Array(Math.min(this.zarrStore.channelCount,7)).fill(void 0),this.channels.downsampleMax=new Array(Math.min(this.zarrStore.channelCount,7)).fill(void 0),c.meta&&c.meta.physicalSizes){const{x:d,y:v,z:f}=c.meta.physicalSizes,x=f?.size||1,E=v?.size||1,C=d?.size||1;this.zarrStore.physicalSizeVoxel=[x,E,C],c.shape&&c.shape.length>=5&&(this.zarrStore.physicalSizeTotal=[(c.shape[2]||1)*x,(c.shape[3]||1)*E,(c.shape[4]||1)*C])}else this.zarrStore.physicalSizeVoxel=[1,1,1],this.zarrStore.physicalSizeTotal=[c.shape[2]||1,c.shape[3]||1,c.shape[4]||1];const{multiscales:g}=this.ngffMetadata;if(!g)throw new Error("Expected multiscales metadata in group.attrs");if(g?.[0]?.datasets?.[0]?.coordinateTransformations){for(let d=0;d<r;d++)if(g?.[0]?.datasets?.[d]?.coordinateTransformations?.[0]?.scale){const{scale:v}=g[0].datasets[d].coordinateTransformations[0];u[d]=[v[4],v[3],v[2]]}}else{o.error("no coordinateTransformations available, assuming downsampling ratio of 2 per dimension");for(let d=0;d<r;d++){const v=2**d;u[d]=[v,v,v]}}this.zarrStore.scales=u;const{coordinateTransformations:m}=this.ngffMetadata;if(m?.[0]?.scale){const{scale:d}=m[0],v=d.length;if(v>=3){const f=d[v-3],x=d[v-2],E=d[v-1];this.zarrStore.physicalSizeVoxel=[f,x,E],c.shape&&c.shape.length>=5&&(this.zarrStore.physicalSizeTotal=[(c.shape[2]||1)*f,(c.shape[3]||1)*x,(c.shape[4]||1)*E])}}this.zarrStore.brickLayout=Ne(e.getMultiResolutionStats()),o.debug("config",t);const{omero:l}=this.ngffMetadata||{};if(!l)throw new Error("Expected omero metadata in ngffMetadata");o.debug("omero",l),Object.keys(t).forEach((d,v)=>{const f=t[d].spatialTargetC;this.channels.zarrMappings[v]=f,this.channels.colorMappings[v]=v,this.channels.downsampleMin[v]=l?.channels?.[f]?.window?.min||0,this.channels.downsampleMax[v]=l?.channels?.[f]?.window?.max||65535}),o.debug("zarrMappings after init",this.channels.zarrMappings),o.debug("colorMappings after init",this.channels.colorMappings),o.debug("downsampleMin after init",this.channels.downsampleMin),o.debug("downsampleMax after init",this.channels.downsampleMax),this.initMRMCPT()}return this.initStatus=G.COMPLETE,M("INIT() COMPLETE"),{success:!0,deviceLimits:this.deviceLimits,zarrStore:this.zarrStore,physicalSizeTotal:this.zarrStore.physicalSizeTotal,physicalSizeVoxel:this.zarrStore.physicalSizeVoxel,error:null}}catch(e){return M("INIT() FAILED"),o.error("Error initializing VolumeDataManager:",e),this.initStatus=G.FAILED,this.initError=e.message||"Unknown error",{success:!1,error:this.initError}}}initMRMCPT(){M("initMRMCPT");const{PT:t,ptTHREE:e,bcTHREE:n}=Ue(this.zarrStore.brickLayout,this.channels.zarrMappings.length);this.PT=t,this.ptTHREE=e,this.bcTHREE=n,M("initMRMCPT() COMPLETE")}async initTexture(){const t=[{x:0,y:0,z:1}];await this.handleBrickRequests(t)}updateChannels(t){if(M("updateChannels"),o.debug("channelProps",t),o.debug("this.channels.zarrMappings",this.channels.zarrMappings),o.debug("this.channels.colorMappings",this.channels.colorMappings),o.debug("this.channels.downsampleMin",this.channels.downsampleMin),o.debug("this.channels.downsampleMax",this.channels.downsampleMax),this.channels.zarrMappings.length===0){o.debug("channels not initialized yet");return}const e=Object.values(t).map(s=>s.spatialTargetC).filter(s=>s!==void 0),n=this.channels.zarrMappings.filter(s=>s!==void 0),a=[...new Set(e)].sort((s,u)=>s-u),r=[...new Set(n)].sort((s,u)=>s-u);a.length===r.length&&a.every((s,u)=>s===r[u])&&o.debug("Channel mappings unchanged, skipping update"),o.debug("Channel mappings changed:",{current:r,requested:a}),Object.entries(t).forEach(([s,u])=>{const c=u.spatialTargetC;o.debug(`UI channel "${s}" wants zarr channel ${c}`);const g=this.channels.zarrMappings.indexOf(c);if(g===-1){const m=this.channels.zarrMappings.findIndex(l=>l===void 0);if(m!==-1)this.channels.zarrMappings[m]=c,o.debug("channelData",u),o.debug("this.ngffMetadata?.omero?.channels",this.ngffMetadata?.omero?.channels),o.debug("targetZarrChannel",c),this.channels.downsampleMin[m]=this.ngffMetadata?.omero?.channels?.[c]?.window?.min||0,this.channels.downsampleMax[m]=this.ngffMetadata?.omero?.channels?.[c]?.window?.max||65535,o.debug(`Mapped zarr channel ${c} to slot ${m}`),o.debug("channels",this.channels);else{o.debug("No free slots found, looking for unused mapped channels");const l=this.channels.zarrMappings.filter(f=>f!==void 0),d=e,v=l.filter(f=>!d.includes(f));if(o.debug("Currently mapped:",l),o.debug("Still requested:",d),o.debug("Unused mapped channels:",v),v.length>0){const f=this.channels.zarrMappings.findIndex(x=>v.includes(x));if(f!==-1){const x=this.channels.zarrMappings[f];this.channels.zarrMappings[f]=c,this.channels.downsampleMin[f]=this.ngffMetadata?.omero?.channels?.[c]?.window?.min||0,this.channels.downsampleMax[f]=this.ngffMetadata?.omero?.channels?.[c]?.window?.max||65535,o.debug(`Reused slot ${f}: ${x} -> ${c}`),this._purgeChannel(f)}else o.error("Could not find slot to reuse - this should not happen")}else o.error("All slots are full and all mapped channels are still in use")}}else o.debug(`Zarr channel ${c} already mapped to slot ${g}`)});const i=Object.values(t).map(s=>{const u=this.channels.zarrMappings.indexOf(s.spatialTargetC);return u!==-1?u:-1});for(;i.length<7;)i.push(-1);o.debug("newColorMappings",i),this.channels.colorMappings=i,o.debug("updatedChannels",this.channels)}getPhysicalDimensionsXYZ(){o.debug("getPhysicalDimensionsXYZ"),o.debug("this.zarrStore.physicalSizeTotal",this.zarrStore.physicalSizeTotal);const t=[this.zarrStore.physicalSizeTotal[2],this.zarrStore.physicalSizeTotal[1],this.zarrStore.physicalSizeTotal[0]];return o.debug("out",t),t}getMaxResolutionXYZ(){o.debug("getMaxResolutionXYZ"),o.debug("this.zarrStore.shapes",this.zarrStore.shapes);const t=[this.zarrStore.shapes[0][4],this.zarrStore.shapes[0][3],this.zarrStore.shapes[0][2]];return o.debug("out",t),t}getOriginalScaleXYZ(){M("getOriginalScaleXYZ"),o.debug("this.zarrStore.physicalSizeVoxel",this.zarrStore.physicalSizeVoxel);const t=[this.zarrStore.physicalSizeVoxel[2],this.zarrStore.physicalSizeVoxel[1],this.zarrStore.physicalSizeVoxel[0]];return o.debug("out",t),t}getNormalizedScaleXYZ(){o.debug("getNormalizedScaleXYZ");const t=[1,this.zarrStore.physicalSizeVoxel[1]/this.zarrStore.physicalSizeVoxel[2],this.zarrStore.physicalSizeVoxel[0]/this.zarrStore.physicalSizeVoxel[0]];return o.debug("out",t),t}getBoxDimensionsXYZ(){o.debug("getBoxDimensionsXYZ"),o.debug("this.zarrStore.shapes",this.zarrStore.shapes);const t=[1,this.zarrStore.shapes[0][3]/this.zarrStore.shapes[0][4],this.zarrStore.shapes[0][2]/this.zarrStore.shapes[0][4]];return o.debug("out",t),t}async loadZarrChunk(t=0,e=0,n,a,r,i){if(!this.zarrStore||!this.zarrStore.arrays[i])throw new Error("Zarr store or resolution not initialized");const s=await this.zarrStore.arrays[i].getChunk([t,e,n,a,r]);if(!s)throw new Error(`No chunk found at coordinates [${t},${e},${n},${a},${r}]`);if(s.data.length!==T*T*T)throw new Error(`Unexpected chunk size: ${s.data.length}`);return s.data}async processRequestData(t){if(this.isBusy){o.debug("processRequestData: already busy, skipping");return}this.isBusy=!0,this.triggerRequest=!1;const{requests:e,origRequestCount:n}=Fe(t,this.k);e.length===0&&(this.noNewRequests=!0),o.debug(`processRequestData: handling ${e.length} requests of ${n}`),await this.handleBrickRequests(e),this.triggerUsage=!0,this.isBusy=!1}async processUsageData(t){if(this.isBusy){o.debug("processUsageData: already busy, skipping"),this.needsBailout=!0;return}this.isBusy=!0,this.triggerUsage=!1;const e=++this.timeStamp,n=new Set;for(let a=0;a<t.length;a+=4){const r=t[a],i=t[a+1],s=t[a+2];if((r|i|s)===0)continue;const u=s*k*L+i*k+r;u<this.BCTimeStamps.length&&n.add(u)}Array.from(n).forEach(a=>{this.BCTimeStamps[a]=e}),this.BCFull&&this._buildLRU(),this.triggerRequest=!0,this.isBusy=!1}_evictBrick(t){const e=this.bc2pt[t];if(!e)return;const[n,a]=this.BCMinMax[t]||[0,0],r=(0|1<<30|Math.min(127,n>>1)<<23|Math.min(127,a>>1)<<16)>>>0;this._updatePTEntry(e.x,e.y,e.z,r),this.bc2pt[t]=null}_purgeChannel(t){if(o.debug("purging channel",t),o.debug("corresponding zarr channel",this.channels.zarrMappings[t]),!this.ptTHREE){o.error("pagetable texture not initialized");return}this.channels.downsampleMin[t]=void 0,this.channels.downsampleMax[t]=void 0,this.channels.zarrMappings[t]=void 0;const e=this.PT.channelOffsets[t];o.debug("channelMask",e),o.error("TODO: not tested yet");const{gl:n}=this,a=this.renderer.properties.get(this.ptTHREE).__webglTexture;n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_3D,a);for(let r=0;r<this.zarrStore.resolutions;r++){const i=[this.PT.anchors[r][2]*e[2],this.PT.anchors[r][1]*e[1],this.PT.anchors[r][0]*e[0]];o.debug("anchor",i);const s=this.zarrStore.brickLayout[r],u=s[0]*s[1]*s[2];o.debug("extents",s),o.debug("size",u),n.texSubImage3D(n.TEXTURE_3D,0,i[0],i[1],i[2],s[0],s[1],s[2],n.RED_INTEGER,n.UNSIGNED_INT,new Uint32Array(u))}n.bindTexture(n.TEXTURE_3D,null)}_updatePTEntry(t,e,n,a){if(!this.ptTHREE)return;const{gl:r}=this,i=this.renderer.properties.get(this.ptTHREE).__webglTexture;r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_3D,i),r.texSubImage3D(r.TEXTURE_3D,0,t,e,n,1,1,1,r.RED_INTEGER,r.UNSIGNED_INT,new Uint32Array([a])),r.bindTexture(r.TEXTURE_3D,null)}_allocateBCSlots(t){let e=[];const n=k*L*ae;if(!this.BCFull&&this.BCUnusedIndex+t>n&&(this.BCFull=!0,o.debug("BRICK CACHE FULL")),this.BCFull)this.LRUStack.length<t&&this._buildLRU(),e=this.LRUStack.splice(0,t).map(a=>{this._evictBrick(a);const r=Math.floor(a/(k*L)),i=a-r*k*L,s=Math.floor(i/k),u=i%k;return{bcIndex:a,x:u,y:s,z:r}});else{for(let a=0;a<t;++a){const r=(this.BCUnusedIndex+a)%n,i=Math.floor(r/(k*L)),s=r-i*k*L,u=Math.floor(s/k),c=s%k;e.push({bcIndex:r,x:c,y:u,z:i})}this.BCUnusedIndex+=t}return e}async _uploadBrick(t,e){if(t.x>=this.PT.xExtent||t.y>=this.PT.yExtent||t.z>=this.PT.zTotal||t.x<0||t.y<0||t.z<0){o.error("this.PT",this.PT),o.error("ptCoord out of bounds",t);return}const{channel:n,resolution:a,x:r,y:i,z:s}=Oe(t.x,t.y,t.z,{PT_zExtent:this.PT.zExtent,PT_z0Extent:this.PT.z0Extent,PT_anchors:this.PT.anchors}),u=this.channels.zarrMappings[n];if(u===void 0||u===-1){o.error("zarrChannel is undefined or -1",u);return}o.debug("starting to load zarr chunk",{resolution:a,z:s,y:i,x:r,zarrChannel:u});let c=await this.loadZarrChunk(0,u,s,i,r,a);if(c instanceof Uint16Array){if(o.debug("chunk is Uint16Array, converting to Uint8Array"),this.channels.downsampleMin[n]===void 0){const y=this.channels.zarrMappings[n];o.debug("channelId was not found in this.channels.downsampleMin[channel]",y),this.channels.downsampleMin[n]=this.ngffMetadata?.omero?.channels?.[y]?.window?.min||0,this.channels.downsampleMax[n]=this.ngffMetadata?.omero?.channels?.[y]?.window?.max||65535,o.debug("this.channels.downsampleMin[channel]",this.channels.downsampleMin[n]),o.debug("this.channels.downsampleMax[channel]",this.channels.downsampleMax[n])}const C=new Uint8Array(c.length);for(let y=0;y<c.length;y++)C[y]=Math.floor((c[y]-this.channels.downsampleMin[n])/(this.channels.downsampleMax[n]-this.channels.downsampleMin[n])*255);c=C}if(!(c instanceof Uint8Array))throw new Error(`Unsupported chunk type: ${c.constructor.name}. Expected Uint8Array.`);let g=255,m=0;for(let C=0;C<c.length;++C){const y=c[C];y<g&&(g=y),y>m&&(m=y)}const{gl:l}=this,d=this.renderer.properties.get(this.bcTHREE).__webglTexture;l.activeTexture(l.TEXTURE2),l.bindTexture(l.TEXTURE_3D,d),l.pixelStorei(l.UNPACK_ALIGNMENT,1),l.texSubImage3D(l.TEXTURE_3D,0,e.x*T,e.y*T,e.z*T,T,T,T,l.RED,l.UNSIGNED_BYTE,c),l.pixelStorei(l.UNPACK_ALIGNMENT,4),l.bindTexture(l.TEXTURE_3D,null);const v=l.getError();v!==l.NO_ERROR&&o.error("WebGL error during brick upload:",v,c),n>=this.channels.zarrMappings.length&&(o.debug("channel is out of bounds",n),g=255,m=255);const f=Le(g,m,e.x,e.y,e.z),x=this.renderer.properties.get(this.ptTHREE).__webglTexture;l.activeTexture(l.TEXTURE0),l.bindTexture(l.TEXTURE_3D,x),l.texSubImage3D(l.TEXTURE_3D,0,t.x,t.y,t.z,1,1,1,l.RED_INTEGER,l.UNSIGNED_INT,new Uint32Array([f])),l.bindTexture(l.TEXTURE_3D,null);const E=l.getError();E!==l.NO_ERROR&&o.error("WebGL error during pagetable upload:",E,c),this.BCTimeStamps[e.bcIndex]=this.timeStamp,this.BCMinMax[e.bcIndex]=[g,m],this.bc2pt[e.bcIndex]=t}async handleBrickRequests(t){if(t.length===0)return;const e=this._allocateBCSlots(t.length);o.debug("handleBrickRequests: starting for loop");for(let n=0;n<t.length;++n){o.debug("uploading brick",t[n],e[n]),await this._uploadBrick(t[n],e[n]);const a=this.bricksEverLoaded.size;if(this.bricksEverLoaded.add(`${t[n].x},${t[n].y},${t[n].z}`),a===this.bricksEverLoaded.size&&o.debug("DUPLICATE BRICK LOADED",t[n]),this.needsBailout){o.debug("Bailing out of handleBrickRequests early due to needsBailout flag"),this.needsBailout=!1;break}}o.debug("this.bricksEverLoaded",this.bricksEverLoaded)}_buildLRU(){const t=this.BCTimeStamps.map((e,n)=>({index:n,time:e}));this.LRUStack=t.sort((e,n)=>e.time-n.time).slice(0,this.k).map(e=>e.index)}}const Ge=`//
// Output: Unnormalized ray direction from camera to each vertex
// Used by fragment shader for ray marching through the volume
out vec3 rayDirUnnorm;

// Output: Camera position transformed into volume's local coordinate system
// Used to calculate ray origins in the fragment shader
out vec3 cameraCorrected;

// Volume scale uniform (likely for anisotropic voxels)
uniform vec3 u_vol_scale;

// Volume size uniform
uniform vec3 u_size;

// Output: Vertex positions normalized to [0,1] range within volume bounds
// Standard coordinate system for volume sampling
varying vec3 worldSpaceCoords;

// Output: Texture coordinates for sampling volume data
varying vec2 vUv;

// Output: Final clip-space position (stored for fragment shader access)
varying vec4 glPosition;

// Volume bounding box size uniform
uniform highp vec3 boxSize;

void main()
{
   // Transform vertex positions from [-0.5, 0.5] range to [0, 1] range
   // This is the standard coordinate system for volume sampling
   //
   // Mathematical transformation:
   // worldSpaceCoords = (position / boxSize) + 0.5
   // 
   // Example:
   // position = (-0.5, -0.5, -0.5) → worldSpaceCoords = (0, 0, 0)
   // position = ( 0.0,  0.0,  0.0) → worldSpaceCoords = (0.5, 0.5, 0.5)
   // position = ( 0.5,  0.5,  0.5) → worldSpaceCoords = (1, 1, 1)
   worldSpaceCoords = position / boxSize + vec3(0.5, 0.5, 0.5); //move it from [-0.5;0.5] to [0,1]
   
   // Transform camera position into volume's local coordinate system
   // This gives us the ray origin in volume space
   cameraCorrected = (inverse(modelMatrix) * vec4(cameraPosition, 1.)).xyz;
   
   // Calculate unnormalized ray direction from camera to each vertex
   // Used by fragment shader for ray marching through the volume
   rayDirUnnorm = position - cameraCorrected;
   
   // Apply standard MVP transformation to get clip-space coordinates
   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   
   // Store clip-space position for fragment shader access
   glPosition = gl_Position;
   
   // Pass through texture coordinates for volume sampling
   vUv = uv;
}
`,Xe=`//
// #include <packing>
precision highp float;
precision highp int;
precision highp sampler3D;
precision highp usampler3D;

// ========================================
// INPUT VARIABLES (from vertex shader)
// ========================================
// Unnormalized ray direction from camera
in vec3 rayDirUnnorm;
// Camera position in world space
in vec3 cameraCorrected;

// ========================================
// TEXTURE SAMPLERS
// ========================================
// 3D texture containing cached brick data (2048x2048x128)
// (2048*2048*128)/(32*32*32) = 16,384 bricks can be stored?
uniform sampler3D brickCacheTex;
// 3D texture containing page table entries (brick metadata)
uniform usampler3D pageTableTex;

// ========================================
// RENDERING PARAMETERS/CONSTANTS
// ========================================
// Rendering style: 0=MIP, 1=MinIP, 2=standard volume rendering
uniform int u_renderstyle;
// Global opacity multiplier for volume rendering
uniform float opacity;

// ========================================
// CONTRAST LIMITS (per channel)
// per channel min/max values for value normalization
// ========================================
uniform vec2 clim0;
uniform vec2 clim1;
uniform vec2 clim2;
uniform vec2 clim3;
uniform vec2 clim4;
uniform vec2 clim5;
uniform vec2 clim6;

// ========================================
// CLIPPING PLANES
// e.g., for X-axis clipping: (min_x, max_x) or (-1, -1) if disabled
// ========================================
uniform vec2 xClip;
uniform vec2 yClip;
uniform vec2 zClip;

// ========================================
// CHANNEL COLORS AND OPACITIES
// rgb -- color values, a -- visibility (boolean)
// ========================================
uniform vec4 color0;
uniform vec4 color1;
uniform vec4 color2;
uniform vec4 color3;
uniform vec4 color4;
uniform vec4 color5;
uniform vec4 color6;

// maps colors to physical spaces
uniform int channelMapping[7];

// ========================================
// VOLUME AND RESOLUTION PARAMETERS
// ========================================
// Volume bounding box size in world space
uniform highp vec3 boxSize;
// Rendering resolution level (affects step size)
// stepsize, correlates with resolution
uniform int renderRes;
// Volume dimensions in voxels (x, y, z)
// resolution 0 voxel extents
uniform uvec3 voxelExtents;
// Global resolution range: (min_res, max_res)
// global range of requested resolutions
uniform ivec2 resGlobal;
// Maximum number of active channels
// max number of channels (relevant for the cache statistics)
// between 1 and 7
uniform int maxChannels;

// ========================================
// PER-CHANNEL RESOLUTION RANGES
// per color channel resolution range
// Each channel can have different available resolution levels
// e.g., for Channel 0: (min_res, max_res)
// ========================================
uniform ivec2 res0;
uniform ivec2 res1;
uniform ivec2 res2;
uniform ivec2 res3;
uniform ivec2 res4;
uniform ivec2 res5;
uniform ivec2 res6;
// Channel 7: unused
uniform ivec2 res7;

// ========================================
// LEVEL-OF-DETAIL PARAMETERS
// controls how fast we decrease the resolution
// ========================================
// LOD factor for distance-based resolution selection
uniform float lodFactor;

// ========================================
// ANCHOR POINTS (per resolution level)
// per resolution anchor point for pagetable
// ========================================
// Anchor points define the origin of page table for each resolution level
// Resolution 0 anchor point (highest detail)
uniform uvec3 anchor0;
uniform uvec3 anchor1;
uniform uvec3 anchor2;
uniform uvec3 anchor3;
uniform uvec3 anchor4;
uniform uvec3 anchor5;
uniform uvec3 anchor6;
uniform uvec3 anchor7;
uniform uvec3 anchor8;
uniform uvec3 anchor9;
// Resolution 9 anchor point (lowest detail)

// ========================================
// SCALE FACTORS (per resolution level)
// per resolution downsample factor
// ========================================
// Scale factors determine voxel size at each resolution level
// Resolution 0 scale factors (should be 1,1,1)
uniform vec3 scale0;
uniform vec3 scale1;
uniform vec3 scale2;
uniform vec3 scale3;
uniform vec3 scale4;
uniform vec3 scale5;
uniform vec3 scale6;
uniform vec3 scale7;
uniform vec3 scale8;
uniform vec3 scale9;
// Resolution 9 scale factors

// ========================================
// VARYING VARIABLES (unused but required)
// ========================================
// Fragment position (unused)
varying vec4 glPosition;
// World space coordinates (used for depth only)
varying vec3 worldSpaceCoords;

// ========================================
// OUTPUT VARIABLES (multiple render targets)
// output buffers
// ========================================
// Final rendered color (sRGB)
layout(location = 0) out vec4 gColor;
// Brick loading requests (packed coordinates)
layout(location = 1) out vec4 gRequest;
// Brick usage tracking (for cache management)
layout(location = 2) out vec4 gUsage;

// ========================================
// CONSTANTS
// ========================================
// Size of each brick in voxels (32x32x32)
const float BRICK_SIZE = 32.0;
// Brick cache texture width
const float BRICK_CACHE_SIZE_X = 2048.0;
// Brick cache texture height
const float BRICK_CACHE_SIZE_Y = 2048.0;
// Brick cache texture depth
const float BRICK_CACHE_SIZE_Z = 128.0;
// Number of bricks in X (64)
const float BRICK_CACHE_BRICKS_X = BRICK_CACHE_SIZE_X / BRICK_SIZE;
// Number of bricks in Y (64)
const float BRICK_CACHE_BRICKS_Y = BRICK_CACHE_SIZE_Y / BRICK_SIZE;
// Number of bricks in Z (4)
const float BRICK_CACHE_BRICKS_Z = BRICK_CACHE_SIZE_Z / BRICK_SIZE;

// ========================================
// RAY-VOLUME INTERSECTION
// calculating the intersection of the ray with the bounding box
// ========================================
// Calculates the intersection of a ray with the volume's bounding box
// Returns (entry_time, exit_time) for the ray-box intersection
// Handles clipping planes by adjusting the bounding box
//
// Parameters:
//   orig - vec3: Ray origin point in world space
//   dir - vec3: Ray direction vector (should be normalized)
//
// Returns:
//   vec2: (entry_time, exit_time) where:
//     - entry_time: Distance along ray to enter the volume
//     - exit_time: Distance along ray to exit the volume
//     - If no intersection: entry_time > exit_time
vec2 intersect_hit(vec3 orig, vec3 dir) {
    // Start with full volume bounds
    vec3 boxMin = vec3(-0.5) * boxSize;
    vec3 boxMax = vec3(0.5) * boxSize;
    
    // Apply clipping planes if they're active (xClip.x > -1.0 means active)
    if (xClip.x > -1.0) {
        boxMin.x = xClip.x - (boxSize.x / 2.0);
        if (xClip.y < boxSize.x)
        boxMax.x = xClip.y - (boxSize.x / 2.0);
    }
    if (yClip.x > -1.0) {
        boxMin.y = yClip.x - (boxSize.y / 2.0);
        if (yClip.y < boxSize.y)
        boxMax.y = yClip.y - (boxSize.y / 2.0);
    }
    if (zClip.x > -1.0) {
        boxMin.z = zClip.x - (boxSize.z / 2.0);
        if (zClip.y < boxSize.z)
        boxMax.z = zClip.y - (boxSize.z / 2.0);
    }
    
    // Standard ray-box intersection algorithm
    vec3 invDir = 1.0 / dir;
    vec3 tmin0 = (boxMin - orig) * invDir;
    vec3 tmax0 = (boxMax - orig) * invDir;
    vec3 tmin = min(tmin0, tmax0);
    vec3 tmax = max(tmin0, tmax0);
    float t0 = max(tmin.x, max(tmin.y, tmin.z));  // Entry time
    float t1 = min(tmax.x, min(tmax.y, tmax.z));  // Exit time
    return vec2(t0, t1);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Pseudo-random number generator for jittered sampling
// random number generator based on the uv coordinate
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
//
// Parameters:
//   None (uses gl_FragCoord.xy as input)
//
// Returns:
//   float: Random value between 0.0 and 1.0 based on fragment coordinates
float random() {
    return fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

// Convert from linear RGB to sRGB color space
// Implements the standard sRGB transfer function for gamma correction
//
// Parameters:
//   x - float: Linear RGB value between 0.0 and 1.0
//
// Returns:
//   float: sRGB value between 0.0 and 1.0
float linear_to_srgb(float x) {
    if (x <= 0.0031308f) {
        return 12.92f * x;
    }
    return 1.055f * pow(x, 1.f / 2.4f) - 0.055f;
}

// Convert from linear RGB to sRGB color space (vector version)
// Applies sRGB conversion to each RGB component while preserving alpha
//
// Parameters:
//   x - vec4: Linear RGBA color with components between 0.0 and 1.0
//
// Returns:
//   vec4: sRGB RGBA color with components between 0.0 and 1.0
vec4 linear_to_srgb(vec4 x) {
    return vec4(linear_to_srgb(x.r), linear_to_srgb(x.g), linear_to_srgb(x.b), x.a);
}

// ========================================
// PAGE TABLE COORDINATE PACKING
// transform the pagetable coordinate into a RGBA8 value
// ========================================
// Packs 3D page table coordinates into RGBA8 texture format
// Uses 10 bits for X, 10 bits for Y, 12 bits for Z
//
// Parameters:
//   coord - uvec3: 3D coordinates to pack (X, Y, Z components)
//     - X coordinate: 10-bit unsigned integer (0-1023)
//     - Y coordinate: 10-bit unsigned integer (0-1023) 
//     - Z coordinate: 12-bit unsigned integer (0-4095)
//
// Returns:
//   vec4: RGBA8 encoded coordinates with components between 0.0 and 1.0
//     - R: Upper 8 bits of packed 32-bit value
//     - G: Middle-upper 8 bits of packed 32-bit value
//     - B: Middle-lower 8 bits of packed 32-bit value
//     - A: Lower 8 bits of packed 32-bit value
vec4 packPTCoordToRGBA8(uvec3 coord) {

    uint x = coord.x & 0x3FFu; // 10 bits for X coordinate
    uint y = coord.y & 0x3FFu; // 10 bits for Y coordinate
    uint z = coord.z & 0xFFFu; // 12 bits for Z coordinate

    // Pack into 32-bit integer
    uint packed =
        (x << 22u) |
        (y << 12u) |
        (z);

    // Decompose into RGBA8 format
    return vec4(
        float((packed >> 24u) & 0xFFu) / 255.0,
        float((packed >> 16u) & 0xFFu) / 255.0,
        float((packed >> 8u) & 0xFFu) / 255.0,
        float(packed & 0xFFu) / 255.0
    );
}

// ========================================
// RESOLUTION AND ANCHOR POINT ACCESSORS
// ========================================

// Get anchor point for a specific resolution level
// Anchor points define the origin of the page table for each resolution
//
// Parameters:
//   index - int: Resolution level index (0-9, where 0 is highest resolution)
//
// Returns:
//   uvec3: 3D anchor point coordinates in the page table, or (-1, -1, -1) if invalid
uvec3 getAnchorPoint(int index) {
    if (index == 0) return anchor0;
    if (index == 1) return anchor1;
    if (index == 2) return anchor2;
    if (index == 3) return anchor3;
    if (index == 4) return anchor4;
    if (index == 5) return anchor5;
    if (index == 6) return anchor6;
    if (index == 7) return anchor7;
    if (index == 8) return anchor8;
    if (index == 9) return anchor9;
    return uvec3(-1, -1, -1);
}

// Find the lowest available resolution level
// Returns the highest resolution index that has valid data
//
// Parameters:
//   None
//
// Returns:
//   int: Highest resolution level index (0-9) that has valid anchor point data
//        Returns 9 if no valid resolution levels are found
int getLowestRes() {
    for (int i = 0; i < 10; i++) {
        if (getAnchorPoint(i) == uvec3(0,0,0)) {
            return i - 1;
        }
    }
    return 9;
}

// Get the downsample factor for a resolution level
// Scale factors determine the voxel size at each resolution
//
// Parameters:
//   index - int: Resolution level index (0-9, where 0 is highest resolution)
//
// Returns:
//   vec3: Scale factors (x, y, z) for the resolution level, or (-1, -1, -1) if invalid
//         Higher scale factors indicate larger voxels (lower resolution)
vec3 getScale(int index) {
    if (index == 0) return scale0;
    if (index == 1) return scale1;
    if (index == 2) return scale2;
    if (index == 3) return scale3;
    if (index == 4) return scale4;
    if (index == 5) return scale5;
    if (index == 6) return scale6;
    if (index == 7) return scale7;
    if (index == 8) return scale8;
    if (index == 9) return scale9;
    return vec3(-1.0, -1.0, -1.0);
}

// Get the resolution range for a color channel
// Returns (min_res, max_res) for the channel
//
// Parameters:
//   index - int: Channel index (0-6)
//
// Returns:
//   ivec2: Resolution range as (min_resolution_level, max_resolution_level)
//          Returns (-1, -1) if channel index is invalid
ivec2 getRes(int index) {
    if (index == 0) return res0;
    if (index == 1) return res1;
    if (index == 2) return res2;
    if (index == 3) return res3;
    if (index == 4) return res4;
    if (index == 5) return res5;
    if (index == 6) return res6;
    return ivec2(-1, -1);
}

// Get the min/max values (contrast limits) for a color channel
// Returns (min_value, max_value) for normalization
//
// Parameters:
//   index - int: Channel index (0-6)
//
// Returns:
//   vec2: Contrast limits as (min_value, max_value) for data normalization
//         Returns (-1.0, -1.0) if channel index is invalid
vec2 getClim(int index) {
    if (index == 0) return clim0;
    if (index == 1) return clim1;
    if (index == 2) return clim2;
    if (index == 3) return clim3;
    if (index == 4) return clim4;
    if (index == 5) return clim5;
    if (index == 6) return clim6;
    return vec2(-1.0, -1.0);
}

// ========================================
// COORDINATE TRANSFORMATIONS
// ========================================

// Convert normalized coordinates (0-1) to voxel coordinates.
// get the voxel coordinate in the specified resolution from the normalized coordinate
//
// Parameters:
//   normalized - vec3: Normalized coordinates in range [0,1] for each axis
//   res - int: Resolution level (0=highest detail, 9=lowest detail)
//
// Returns:
//   vec3: Voxel coordinates in the volume space at the specified resolution
vec3 getVoxelFromNormalized(vec3 normalized, int res) {
    vec3 extents = (vec3(voxelExtents) / getScale(res)); // Voxel extents at this resolution
    vec3 voxel = normalized * extents;
    return voxel;
}

// Convert voxel coordinates to normalized coordinates (0-1)
// get the normalized coordinate based on the voxel coordinate in the specified resolution
//
// Parameters:
//   voxel - vec3: Voxel coordinates in the volume space
//   res - int: Resolution level (0=highest detail, 9=lowest detail)
//
// Returns:
//   vec3: Normalized coordinates in range [0,1] for each axis
vec3 getNormalizedFromVoxel(vec3 voxel, int res) {
    vec3 extents = (vec3(voxelExtents) / getScale(res)); // Voxel extents at this resolution
    vec3 normalized = voxel / extents;
    return normalized;
}

// Convert normalized coordinates to brick coordinates.
// get the brick coordinate in the specified resolution based on the normalized coordinate
// needed for pagetable calculations
//
// Parameters:
//   normalized - vec3: Normalized coordinates in range [0,1] for each axis
//   res - int: Resolution level (0=highest detail, 9=lowest detail)
//
// Returns:
//   vec3: Brick coordinates (each brick is 32x32x32 voxels)
vec3 getBrickFromNormalized(vec3 normalized, int res) {
    vec3 voxel = getVoxelFromNormalized(normalized, res);
    vec3 brick = floor(voxel / 32.0);  // Each brick is 32x32x32 voxels
    return brick;
}

// Convert voxel coordinates to brick coordinates.
// get the brick coordinate in the specified resolution based on the voxel coordinate
//
// Parameters:
//   voxel - vec3: Voxel coordinates in the volume space
//   res - int: Resolution level (0=highest detail, 9=lowest detail)
//
// Returns:
//   vec3: Brick coordinates (each brick is 32x32x32 voxels)
vec3 getBrickFromVoxel(vec3 voxel, int res) {
    vec3 brick = floor(voxel / 32.0);  // Each brick is 32x32x32 voxels
    return brick;
}

// ========================================
// CHANNEL-SPECIFIC ACCESSORS
// ========================================

// Get channel offset in page table.
// get the vector for the specified channel slot in the pagetable
// Different channels are stored at different Z-offsets in the page table
//
// Parameters:
//   index - int: Channel index (0-6)
//
// Returns:
//   uvec3: 3D offset coordinates for the channel in the page table
uvec3 getChannelOffset(int index) {
    if (index == 0) return uvec3(0, 0, 1);
    if (index == 1) return uvec3(0, 1, 0);
    if (index == 2) return uvec3(0, 1, 1);
    if (index == 3) return uvec3(1, 0, 0);
    if (index == 4) return uvec3(1, 0, 1);
    if (index == 5) return uvec3(1, 1, 0);
    if (index == 6) return uvec3(1, 1, 1);
    return uvec3(0, 0, 0);
}

// Get color for a channel.
// get the color per color channel
//
// Parameters:
//   index - int: Channel index (0-6)
//
// Returns:
//   vec3: RGB color values for the specified channel
vec3 getChannelColor(int index) {
    if (index == 0) return color0.xyz;
    if (index == 1) return color1.xyz;
    if (index == 2) return color2.xyz;
    if (index == 3) return color3.xyz;
    if (index == 4) return color4.xyz;
    if (index == 5) return color5.xyz;
    if (index == 6) return color6.xyz;
    return vec3(0.0, 0.0, 0.0);
}

// Get opacity for a channel
// get the opacity (used as visibility) per color channel
//
// Parameters:
//   index - int: Channel index (0-6)
//
// Returns:
//   float: Opacity value (0.0-1.0) for the specified channel
float getChannelOpacity(int index) {
    if (index == 0) return color0.w;
    if (index == 1) return color1.w;
    if (index == 2) return color2.w;
    if (index == 3) return color3.w;
    if (index == 4) return color4.w;
    if (index == 5) return color5.w;
    if (index == 6) return color6.w;
    return 0.0;
}

// ========================================
// PAGE TABLE DECODING
// ========================================

/**
 * retrieving the brick based on:
 * location   -- normalized coordinate
 * targetRes  -- target resolution
 * channel    -- physical channel slot
 * rnd        -- random number for jittering requests 
 * query      -- whether to query the brick (we dont query for interblock interpolation)
 * colorIndex -- color index for querying the min max values
 * 
 * returns:
 * w >= 0 -- xyz contains brick cache coordinate, w stores resolution
 * w == -1 -- not resident in any resolution, should be treated as empty
 * w == -2 -- empty (with respect to current transfer function)
 * w == -3 -- constant full (with respect to current transfer function)
 * w == -4 -- constant value within range, x stores that value
 *
 * bit layout:
 * [1] 31    | 0 — flag resident
 * [1] 30    | 1 — flag init
 * [7] 23…29 | 2…8 — min → 128
 * [7] 16…22 | 9…15 — max → 128
 * [6] 10…15 | 16…21 — x offset in brick cache → max 64
 * [6] 4…9   | 22…27 — y offset in brick cache →  max 64
 * [4] 0…3   | 28…31 — z offset in brick cache → max 16, effectively 4
*/

/*
Page table entry format (32 bits):
[31]    | 0 — flag resident (1=loaded in cache)
[30]    | 1 — flag init (1=initialized)
[29:23] | 2…8 — min value (7 bits) → 128 levels
[22:16] | 9…15 — max value (7 bits) → 128 levels  
[15:10] | 16…21 — x offset in brick cache (6 bits) → 64 bricks
[9:4]   | 22…27 — y offset in brick cache (6 bits) → 64 bricks
[3:0]   | 28…31 — z offset in brick cache (4 bits) → 16 bricks
*/

// Query page table to find brick location and status
// Searches for a brick at the specified location across multiple resolution levels
// and returns its cache coordinates and status information
//
// Parameters:
//   location - vec3: Normalized coordinates (0-1) within the volume
//   targetRes - int: Target resolution level to start searching from
//   channel - int: Channel index (0-6) to query
//   rnd - float: Random value (0-1) used for brick loading request selection
//   query - bool: Whether to allow brick loading requests (true) or just query (false)
//   colorIndex - int
//
// Returns:
//   ivec4: (x_offset, y_offset, z_offset, status) where:
//     - x_offset, y_offset, z_offset: Brick cache coordinates if found
//     - status: Resolution level (>=0) if found, or status code:
//       * -1: Not found at any resolution level
//       * -2: Empty brick (all values below threshold)
//       * -3: Constant full brick (all values above threshold)
//       * -4: Constant value brick (uniform value)
// add maxres here
ivec4 getBrickLocation(vec3 location, int targetRes, int channel, float rnd, bool query, int colorIndex) {

    // min max for current color 
    vec2 clim = getClim(colorIndex);

    // resolution ranges, TODO: connect this back to color
    int channelMin = getRes(channel).x;
    int channelMax = getRes(channel).y;

    // Clamp resolution to channel's available range
    int currentRes = clamp(targetRes, channelMin, channelMax);
    currentRes = clamp(currentRes, resGlobal.x, resGlobal.y);
    int lowestRes = clamp(resGlobal.y, channelMin, channelMax);

    // Determine if this channel should request brick loading.
    // request the current channel based on probability
    bool requestChannel = false;
    if (int(floor(rnd * float(maxChannels))) == colorIndex) {
        requestChannel = true;
    }

    // Try progressively lower resolutions until we find data.
    // loop through resolutions
    while (currentRes <= lowestRes) {

        // Calculate page table coordinates for this brick
        uvec3 anchorPoint = getAnchorPoint(currentRes);
        vec3 brickLocation = getBrickFromNormalized(location, currentRes);
        uvec3 channelOffset = getChannelOffset(channel);
        vec3 coordinate = floor(vec3(anchorPoint * channelOffset)) + brickLocation;
        
        // Special handling for resolution 0 (highest detail)
        if (currentRes == 0) {
            int zExtent = int(ceil(float(voxelExtents.z) / 32.0));
            coordinate = vec3(anchorPoint) + vec3(0.0, 0.0, zExtent * channel) + brickLocation;
        }

        // Query the page table.
        // get PT entry
        uint ptEntry = texelFetch(pageTableTex, ivec3(coordinate), 0).r;

        // Check if brick is initialized.
        // check if the PT entry is initialized
        uint isInit = (ptEntry >> 30u) & 1u;
        if (isInit == 0u) { 
            currentRes++; 
            // Request brick loading if needed
            if (requestChannel == true && (gRequest.a + gRequest.b + gRequest.g + gRequest.r == 0.0) && query == true) {
                gRequest = packPTCoordToRGBA8(uvec3(coordinate));
            }
            continue;
        }
        
        // Extract min/max values from page table entry.
        // get the min max values of the brick
        uint umin = ((ptEntry >> 23u) & 0x7Fu);
        uint umax = ((ptEntry >> 16u) & 0x7Fu);
        float min = float(int(umin)) / 127.0;
        float max = float(int(umax)) / 127.0;
        
        // Check if brick is empty (all values below threshold).
        // exit early if brick is constant
        if (float(max) <= clim.x) {
            return ivec4(0,0,0,-2);
            // EMPTY
        } else if (float(min) >= clim.y) {
            return ivec4(0,0,0,-3);  // CONSTANT FULL
        } else if ((umax - umin) < 2u) {
            return ivec4(min,0,0,-4);  // CONSTANT OTHER VALUE
        }
        
        // Check if brick is resident in cache.
        // return brick cache location if resident
        // continue to next resolution if not resident
        uint isResident = (ptEntry >> 31u) & 1u;
        if (isResident == 0u) {
            currentRes++;
            // Request brick loading if needed
            if (requestChannel == true && (gRequest.a + gRequest.b + gRequest.g + gRequest.r == 0.0) && query == true) {
                gRequest = packPTCoordToRGBA8(uvec3(coordinate));
            }
            continue;
        } else {
            // Extract brick cache coordinates
            uint xBrickCache = (ptEntry >> 10u) & 0x3Fu;
            uint yBrickCache = (ptEntry >> 4u) & 0x3Fu;
            uint zBrickCache = ptEntry & 0xFu;
            uvec3 brickCacheCoord = uvec3(xBrickCache, yBrickCache, zBrickCache);

            return ivec4(brickCacheCoord, currentRes);
        }
    }

    // not resident in any resolution, should be treated as empty
    return ivec4(0,0,0,-1);  // Not found
}

// Request brick loading for a specific location and resolution.
// Initiates a request to load a brick from disk into the brick cache.
// set the brick request for the specified slot channel
//
// Parameters:
//   location - vec3: Normalized world space coordinates (0.0 to 1.0) where the brick is needed
//   targetRes - int: Target resolution level (0-9, where 0 is highest resolution)
//   channel - int: Channel index (0-6) for multi-channel datasets
//   rnd - float: Random value between 0.0 and 1.0 used for load balancing across channels
//
// Returns:
//   void: No return value, but sets gRequest output variable if conditions are met
void setBrickRequest(vec3 location, int targetRes, int channel, float rnd) {
    uvec3 anchorPoint = getAnchorPoint(targetRes);
    vec3 brickLocation = getBrickFromNormalized(location, targetRes);
    uvec3 channelOffset = getChannelOffset(channel);
    vec3 coordinate = floor(vec3(anchorPoint * channelOffset)) + brickLocation;
    
    // Special handling for resolution 0
    if (targetRes == 0) {
        int zExtent = int(ceil(float(voxelExtents.z) / 32.0));
        coordinate = vec3(anchorPoint) + vec3(0.0, 0.0, zExtent * channel) + brickLocation;
    }
    
    // Pack coordinates and set request
    if (int(floor(rnd * float(maxChannels))) == channel) {
        gRequest = packPTCoordToRGBA8(uvec3(coordinate));
    }
}

// Track brick usage for cache management.
// Records which brick in the cache is being accessed for LRU (Least Recently Used) eviction.
// set the usage for the specified brick
//
// Parameters:
//   brickCacheOffset - ivec3: 3D coordinates of the brick within the brick cache texture
//   t_hit_min_os - float: Ray entry time in object space (start of ray-volume intersection)
//   t_hit_max_os - float: Ray exit time in object space (end of ray-volume intersection)
//   t_os - float: Current sampling position along the ray in object space
//   rnd - float: Random value between 0.0 and 1.0 used for probabilistic usage tracking
//
// Returns:
//   void: No return value, but sets gUsage output variable to track cache access patterns
void setUsage(ivec3 brickCacheOffset, float t_hit_min_os, float t_hit_max_os, float t_os, float rnd) {
    float normalized_t_os = (t_os - t_hit_min_os) / (t_hit_max_os - t_hit_min_os); // Normalize to 0-1
    if (normalized_t_os <= rnd || gUsage == vec4(0.0, 0.0, 0.0, 0.0)) {
        gUsage = vec4(vec3(brickCacheOffset) / 255.0, 1.0);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Get maximum component of a 3D vector.
// get the max value of a vec3
//
// Parameters:
//   v - vec3: Input 3D vector
//
// Returns:
//   float: The maximum value among the x, y, and z components
float vec3_max(vec3 v) {
    return max(v.x, max(v.y, v.z));
}

// Get minimum component of a 3D vector.
// get the min value of a vec3
//
// Parameters:
//   v - vec3: Input 3D vector
//
// Returns:
//   float: The minimum value among the x, y, and z components
float vec3_min(vec3 v) {
    return min(v.x, min(v.y, v.z));
}

// Calculate level-of-detail based on distance.
// Uses logarithmic scaling to determine appropriate resolution level.
// get the LOD based on the distance to the camera
//
// Parameters:
//   distance - float: Distance from camera to sampling point
//   highestRes - int: Highest available resolution level (typically 0)
//   lowestRes - int: Lowest available resolution level (typically 9)
//   lodFactor - float: Scaling factor that controls LOD sensitivity
//
// Returns:
//   int: Resolution level index (0-9) where 0 is highest resolution
int getLOD(float distance, int highestRes, int lowestRes, float lodFactor) {
    int lod = int(log2(distance * lodFactor));
    return clamp(lod, highestRes, lowestRes);
}

// Calculate step size for ray marching at a given resolution.
// Determines optimal sampling step size based on voxel dimensions and ray direction.
// get the voxel step in object space
//
// Parameters:
//   res - int: Resolution level index (0-9, where 0 is highest resolution)
//   osDir - vec3: Ray direction vector in object space (should be normalized)
//
// Returns:
//   float: Optimal step size in object space units for stable ray marching
float voxelStepOS(int res, vec3 osDir) {
    vec3 voxelSize = getScale(res) / vec3(voxelExtents);
    vec3 dt_vec = voxelSize / abs(osDir);
    return min(dt_vec.x, min(dt_vec.y, dt_vec.z));
}

// ========================================
// INTERPOLATION FUNCTIONS
// ========================================

// Linear interpolation between two values.
// Performs smooth interpolation between two scalar values.
//
// Parameters:
//   v0 - float: First value to interpolate from
//   v1 - float: Second value to interpolate to
//   fx - float: Interpolation factor between 0.0 and 1.0
//
// Returns:
//   float: Interpolated value between v0 and v1 based on fx
float lerp(float v0, float v1, float fx) {
    return mix(v0, v1, fx); // (1-fx)·v0 + fx·v1
}

// Bilinear interpolation between four values
// Performs 2D interpolation using four corner values arranged in a square
//
// Parameters:
//   v00 - float: Bottom-left corner value
//   v10 - float: Bottom-right corner value
//   v01 - float: Top-left corner value
//   v11 - float: Top-right corner value
//   f - vec2: 2D interpolation factors (x, y) between 0.0 and 1.0
//
// Returns:
//   float: Interpolated value from the four corner values
float bilerp(float v00, float v10, float v01, float v11, vec2 f) {
    float c0 = mix(v00, v10, f.x); // Interpolate in X on bottom row
    float c1 = mix(v01, v11, f.x); // Interpolate in X on top row
    return mix(c0, c1, f.y); // Now interpolate those in Y
}

// Trilinear interpolation between eight values
// Performs 3D interpolation using eight corner values arranged in a cube
//
// Parameters:
//   v000 - float: Bottom-left-back corner value
//   v100 - float: Bottom-right-back corner value
//   v010 - float: Bottom-left-front corner value
//   v110 - float: Bottom-right-front corner value
//   v001 - float: Top-left-back corner value
//   v101 - float: Top-right-back corner value
//   v011 - float: Top-left-front corner value
//   v111 - float: Top-right-front corner value
//   f - vec3: 3D interpolation factors (x, y, z) between 0.0 and 1.0
//
// Returns:
//   float: Interpolated value from the eight corner values
float trilerp(
    float v000, float v100, float v010, float v110,
    float v001, float v101, float v011, float v111,
    vec3 f) { // f = fract(coord)
    // Interpolate along X for each of the four bottom-face voxels
    float c00 = mix(v000, v100, f.x);
    float c10 = mix(v010, v110, f.x);
    float c01 = mix(v001, v101, f.x);
    float c11 = mix(v011, v111, f.x);

    // Interpolate those along Y
    float c0 = mix(c00, c10, f.y);
    float c1 = mix(c01, c11, f.y);

    // Final interpolation along Z
    return mix(c0, c1, f.z);
}

// ========================================
// BRICK CACHE SAMPLING
// ========================================

// Sample a value from the brick cache texture.
// Converts brick coordinates and voxel position to texture coordinates for sampling.
// sample the brick cache based on the brick cache coordinate and the in-brick coordinate
//
// Parameters:
//   brickCacheCoord - vec3: 3D coordinates of the brick within the brick cache
//   voxelInBrick - vec3: 3D coordinates of the voxel within the brick (0-31 in each dimension)
//
// Returns:
//   float: Sampled voxel value from the brick cache texture (typically normalized 0.0-1.0)
float sampleBrick(vec3 brickCacheCoord, vec3 voxelInBrick) {
    vec3 brickCacheCoordNormalized = vec3(
        (float(brickCacheCoord.x) * BRICK_SIZE + float(voxelInBrick.x)) / BRICK_CACHE_SIZE_X,
        (float(brickCacheCoord.y) * BRICK_SIZE + float(voxelInBrick.y)) / BRICK_CACHE_SIZE_Y,
        (float(brickCacheCoord.z) * BRICK_SIZE + float(voxelInBrick.z)) / BRICK_CACHE_SIZE_Z
    );
    return texture(brickCacheTex, brickCacheCoordNormalized).r;
}

/**
 * main renderloop
*/
void main(void) {

    // ========================================
    // INITIALIZATION
    // ========================================
    
    // Initialize all render targets (multiple output textures)
    gRequest = vec4(0,0,0,0);  // Brick loading requests
    gUsage = vec4(0,0,0,0);    // Brick usage tracking
    gColor = vec4(0.0, 0.0, 0.0, 0.0);  // Final color output

    // out color sums up our accumulated value before writing it into the gColor buffer
    vec4 outColor = vec4(0.0, 0.0, 0.0, 0.0);  // Accumulated color

    // Generate random number for jittered sampling (reduces artifacts)
    float rnd = random();

    // Get the lowest available resolution level
    int lowestDataRes = getLowestRes();

    // ========================================
    // RAY-VOLUME INTERSECTION
    // ========================================
    
    // Normalize the view ray direction
    vec3 ws_rayDir = normalize(rayDirUnnorm);
    
    // Calculate intersection with volume bounding box
    // Returns (entry_time, exit_time) for the ray-box intersection
    vec2 t_hit = intersect_hit(cameraCorrected, ws_rayDir);
    if (t_hit.x >= t_hit.y) { discard; }  // Ray misses volume entirely
    
    t_hit.x = max(t_hit.x, 0.0); // Clamp entry to 0 (no negative distances)
    float t = t_hit.x;
    
    // Calculate distance from camera for LOD selection
    float distance = abs((cameraCorrected / boxSize).z + (ws_rayDir / boxSize).z * t );

    // ========================================
    // COORDINATE SPACE CONVERSION
    // ========================================
    
    // Convert from world space to object space (normalized 0-1 coordinates)
    float ws2os = length(ws_rayDir / boxSize);  // Scale factor for conversion
    float t_hit_min_os = t_hit.x * ws2os;       // Entry point in object space
    float t_hit_max_os = t_hit.y * ws2os;       // Exit point in object space
    float t_os = t_hit_min_os;                  // Current position in object space

    // Calculate effective LOD factor based on volume size.
    // voxel edge is the max extent of the volume
    float voxelEdge = float(max(voxelExtents.x, max(voxelExtents.y, voxelExtents.z)));

    // calculate LOD factor based on the voxel edge
    float lodFactorEffective = lodFactor * voxelEdge / 256.0;

    // ========================================
    // RESOLUTION AND SAMPLING SETUP
    // ========================================
    
    // Determine target resolution based on distance (LOD)
    int targetRes = getLOD(t, 0, 9, lodFactorEffective);
    
    // Set adaptive stepping resolution
    int stepResAdaptive = renderRes;
    int stepResEffective = clamp(stepResAdaptive, 0, lowestDataRes);

    // Convert ray to object space coordinates
    vec3 os_rayDir = normalize(ws_rayDir / boxSize);
    vec3 os_rayOrigin = cameraCorrected / boxSize + vec3(0.5);
    
    // Calculate step size based on current resolution
    float dt = voxelStepOS(stepResEffective, os_rayDir);

    // ========================================
    // SAMPLING POSITION INITIALIZATION
    // ========================================
    
    // Convert to normalized sampling coordinates (0-1 range)
    vec3 p = cameraCorrected + t_hit.x * ws_rayDir;
    p = p / boxSize + vec3(0.5); // Transform to 0-1 range
    
    // Calculate step vector in normalized space
    vec3 dp = (os_rayDir * dt);
    
    // Apply jittered sampling to reduce artifacts
    p += dp * (rnd);
    // Avoid boundary issues
    p = clamp(p, 0.0 + 0.0000028, 1.0 - 0.0000028);

    // ========================================
    // RENDERING VARIABLES
    // ========================================
    
    // Color accumulation for front-to-back compositing.
    // color accumulation variables, are calculated per 'slice'
    vec3 rgbCombo = vec3(0.0);
    float total = 0.0;

    // For alpha blending.
    // alpha accumulation variable runs globally
    float alphaMultiplicator = 1.0;

    // Request tracking (for brick loading).
    // if we have a request for a brick which not visible in lower
    // resolutions, we can overwrite it once
    bool overWrittenRequest = false;

    // Current state tracking
    vec3 currentTargetResPTCoord = vec3(0,0,0);
    int currentLOD = targetRes;

    // ========================================
    // CHANNEL-SPECIFIC CONSTANTS
    // ========================================
    
    // Pre-compute channel properties for efficiency.
    // constants per color channel
    vec3 [] c_color = vec3[7](getChannelColor(0), getChannelColor(1), getChannelColor(2), getChannelColor(3), getChannelColor(4), getChannelColor(5), getChannelColor(6));
    float [] c_opacity = float[7](getChannelOpacity(0), getChannelOpacity(1), getChannelOpacity(2), getChannelOpacity(3), getChannelOpacity(4), getChannelOpacity(5), getChannelOpacity(6));
    // resolution ranges (currently) per color channel
    // TODO: figure out how to hook it up with frontend
    int [] c_res_min = int[7](getRes(0).x, getRes(1).x, getRes(2).x, getRes(3).x, getRes(4).x, getRes(5).x, getRes(6).x);
    int [] c_res_max = int[7](getRes(0).y, getRes(1).y, getRes(2).y, getRes(3).y, getRes(4).y, getRes(5).y, getRes(6).y);
    
    // ========================================
    // PER-CHANNEL STATE ARRAYS
    // ========================================
    
    // Current state for each channel.
    // current state variables per color channel
    
    // current resolution
    int []   c_res_current =             int[7](0,0,0,0,0,0,0);
    // current value
    float [] c_val_current =             float[7](0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
    // current brick cache coordinate
    vec3 []  c_brickCacheCoord_current = vec3[7](vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
    // current voxel in current resolution
    vec3 []  c_voxel_current =           vec3[7](vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
    // current pagetable coordinate
    vec3 []  c_ptCoord_current =         vec3[7](vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
    // current render mode -- 0: empty (add 0), 1: constant (add current val), 2: voxel (query new voxel)
    // upon change of PT we re-query anyways
    int []   c_renderMode_current =      int[7](-1, -1, -1, -1, -1, -1, -1);
    
    // Adjacent brick caching for interpolation
    // current pagetable coordinate of the adjacent bricks in X, Y, Z or diagonal direction
    vec3 []  c_PT_X_adjacent =           vec3[7](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    vec3 []  c_PT_Y_adjacent =           vec3[7](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    vec3 []  c_PT_Z_adjacent =           vec3[7](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    vec3 []  c_PT_XYZ_adjacent =         vec3[7](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    // corresponding brick coordinates of the adjacent bricks in X, Y, Z or diagonal direction
    vec4 []  c_brick_X_adjacent =        vec4[7](vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0));
    vec4 []  c_brick_Y_adjacent =        vec4[7](vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0));
    vec4 []  c_brick_Z_adjacent =        vec4[7](vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0));
    vec4 []  c_brick_XYZ_adjacent =      vec4[7](vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0), vec4(-1.0));

    // Min/max tracking for MIP/MinIP rendering.
    // min and max values of the current color
    // used for minimum/maximum intensity projection
    float [] c_minVal = float[7](-1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0);
    float [] c_maxVal = float[7](0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

    // Per-resolution coordinate tracking
    vec3 [] r_ptCoord = vec3[10](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    vec3 [] r_voxel = vec3[10](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    vec3 [] r_prevPTCoord = vec3[10](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));
    vec3 [] r_prevVoxel = vec3[10](vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0), vec3(-1.0));

    // resolution changed flag
    bool resolutionChanged = false;
    // number of repetitions (for debugging purposes)
    int reps = 0;

    // ========================================
    // MAIN RAY-MARCHING LOOP
    // ========================================
    
    // while we are 'in' the volume.
    // Continue marching until we exit the volume or reach maximum opacity.
    while (t_os < t_hit_max_os && t_os >= t_hit_min_os
        && vec3_max(p) < 1.0 && vec3_min(p) >= 0.0
    ) {

        // Reset per-sample accumulation.
        // initialize slice values
        vec3 rgbCombo = vec3(0.0);
        float total   = 0.0;

        // Update target resolution based on current distance (with jitter).
        // calculate target resolution based on distance and lod factor
        targetRes = getLOD(t, 0, 9, lodFactorEffective * (0.999 + 0.002 * rnd));

        // ========================================
        // RESOLUTION CHANGE HANDLING
        // ========================================
        
        // if target resolution changed, update the current resolution and stepsize
        if (targetRes != currentLOD) {
            currentLOD = targetRes;
            stepResAdaptive++;
            stepResEffective = clamp(stepResAdaptive, 0, lowestDataRes);
            
            // Adjust sampling position for new resolution
            p -= dp * rnd;
            dt = voxelStepOS(stepResEffective, os_rayDir);
            dp = os_rayDir * dt;
            p += dp * rnd;
            resolutionChanged = true;

            // Check bounds after resolution change
            if (p.x < 0.0 || p.x >= 1.0 || p.y < 0.0 || p.y >= 1.0 || p.z < 0.0 || p.z >= 1.0) {
                break;
            }
        } else {
            resolutionChanged = false;
        }

        // ========================================
        // UPDATE COORDINATES FOR ALL RESOLUTIONS
        // ========================================
        
        // Calculate page table coordinates and voxel positions for all resolution levels
        for (int r = 0; r < 10; r++) {
            r_prevPTCoord[r] = r_ptCoord[r];
            r_prevVoxel[r] = r_voxel[r];
            r_ptCoord[r] = getBrickFromNormalized(p, r);
            r_voxel[r] = getVoxelFromNormalized(p, r);
        }

        // ========================================
        // RENDER MODE DEFINITIONS
        // ========================================
        // 0: empty brick (no data)
        // 1: constant brick (uniform value)
        // 2: voxel brick (variable data)

        // initialize the per channel slice values
        vec3 sliceColor = vec3(0.0);
        float sliceAlpha = 0.0;

        // ========================================
        // MULTI-CHANNEL SAMPLING
        // ========================================
        
        // Process each channel independently.
        // iterate over up to 7 channels by color
        for (int c = 0; c < 7; c++) {
            // Skip channels with zero opacity.
            // skip if opacity is 0 or if color is not mapped to a physical slot
            if (c_opacity[c] <= 0.000001) {
                continue;
            } else if (channelMapping[c] == -1) {
                continue;
            }

            // physical slot in pagetable
            int slot = channelMapping[c];

            // keep track of status
            bool newBrick = false;
            bool newVoxel = false;
            // best possible resolution
            int bestRes = clamp(targetRes, c_res_min[c], c_res_max[c]);

            // Check if we need to load a new brick at a better resolution.
            // check if any new better resolution could be available, if so, we need to re-query the brick
            bool betterResChanged = false;
            for (int r = bestRes; r <= c_res_current[c]; r++ ) {
                if (r_ptCoord[r] != r_prevPTCoord[r]) {
                    betterResChanged = true;
                    break;
                }
            }

            // Determine if we need to load new brick data.
            // check if we need to re-query the brick / voxel or reuse past 'val'
            if (r_ptCoord[bestRes] != r_prevPTCoord[bestRes]
                || c_renderMode_current[c] == -1
                || resolutionChanged == true
                || betterResChanged
                ) {
                newBrick = true;
                newVoxel = true;
            } else if (c_renderMode_current[c] == 2) {
                newVoxel = true;
            } else if (c_renderMode_current[c] == 0) {
                continue;  // Skip empty bricks
            }

            // ========================================
            // BRICK LOADING AND CACHING
            // ========================================
            
            // check if a new brick is available in the best possible resolution
            if (newBrick) {
                // Query page table for brick location and status
                ivec4 brickCacheInfo = getBrickLocation(p, bestRes, slot, rnd, true, c);
                // check information about the newly queried brick
                // if the res is not at best res, possibly the same as previous brick
                if (brickCacheInfo.w == -1 || brickCacheInfo.w == -2) {
                    // Empty brick - no data available.
                    // we can skip the rest of the loop
                    c_val_current[c] = 0.0;
                    c_renderMode_current[c] = 0;
                    c_minVal[c] = 0.0;
                    continue;
                } else if (brickCacheInfo.w == -3) {
                    // Solid brick - constant maximum value.
                    // we set the value and do not need to query a voxel
                    c_val_current[c] = 1.0;
                    c_renderMode_current[c] = 1;
                    c_maxVal[c] = 1.0;
                    newVoxel = false;
                } else if (brickCacheInfo.w == -4) {
                    // Constant brick - uniform value.
                    // static value -- we set the value and do not need to query a voxel
                    float val = float(brickCacheInfo.x);
                    c_val_current[c] = max(0.0, (val - getClim(c).x) / (getClim(c).y - getClim(c).x));
                    c_renderMode_current[c] = 1;
                    newVoxel = false;
                } else if (brickCacheInfo.w >= 0) {
                    // Voxel brick - variable data, load from cache.
                    // new brick -- we set the coordinate and resolution and need to query a voxel
                    c_res_current[c] = brickCacheInfo.w;
                    c_ptCoord_current[c] = r_ptCoord[c_res_current[c]];
                    c_brickCacheCoord_current[c] = vec3(brickCacheInfo.xyz);
                    c_renderMode_current[c] = 2;
                    newVoxel = true;
                    
                    // Track brick usage for cache management.
                    // we set the usage of the brick based on the channel and the relative distance into the cube
                    if (int(floor(rnd * float(maxChannels))) == c) {
                        setUsage(brickCacheInfo.xyz, t_hit_min_os, t_hit_max_os, t_os, rnd);
                    }
                }
            }
            
            // ========================================
            // VOXEL SAMPLING WITH INTERPOLATION
            // ========================================
            
            // we need to query a new voxel e.g. sample the brick cache
            if (newVoxel) {
                c_voxel_current[c] = r_voxel[c_res_current[c]];

                // we clamp the coordinate to be inside the brick and sample the volume
                reps++;
                
                // Calculate position within the brick (0-31 range)
                vec3 voxelInBrick = mod(c_voxel_current[c], 32.0);
                vec3 clampedVoxelInBrick = clamp(voxelInBrick, 0.5, 31.5);
                // Sample the brick cache texture
                float val = sampleBrick(c_brickCacheCoord_current[c].xyz, clampedVoxelInBrick);

                // ========================================
                // HIGH-QUALITY INTERPOLATION (renderRes == 0)
                // ========================================
                
                // interblock interpolation
                if (renderRes == 0) {
                    // calculate what axis we need to interpolate
                    
                    // Check if we're near brick boundaries (need interpolation)
                    bvec3 clampedMin = lessThan(voxelInBrick, clampedVoxelInBrick);
                    bvec3 clampedMax = greaterThan(voxelInBrick, clampedVoxelInBrick);
                    bvec3 clamped = bvec3(clampedMin.x || clampedMax.x, clampedMin.y || clampedMax.y, clampedMin.z || clampedMax.z);
                    vec3 diff = voxelInBrick - clampedVoxelInBrick;
                    
                    if (any(clampedMin) || any(clampedMax)) {                       
                        int boundaryAxes = int(clamped.x) + int(clamped.y) + int(clamped.z);
                        float f = 0.0;
                                                
                        if (boundaryAxes == 1) {
                            // Linear interpolation across one boundary
                            vec3 otherGlobalVoxelPos = vec3(0,0,0);
                            vec3 otherP = vec3(0,0,0);
                            float otherVoxelVal = 0.0;

                            // Determine which axis we're interpolating across
                            if (clampedMin.x) {
                                otherGlobalVoxelPos = c_voxel_current[c] - vec3(1.0, 0.0, 0.0);
                                otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                                f = abs(diff.x);
                            } else if (clampedMax.x) {
                                otherGlobalVoxelPos = c_voxel_current[c] + vec3(1.0, 0.0, 0.0);
                                otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                                f = abs(diff.x);
                            } else if (clampedMin.y) {
                                otherGlobalVoxelPos = c_voxel_current[c] - vec3(0.0, 1.0, 0.0);
                                otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                                f = abs(diff.y);
                            } else if (clampedMax.y) {
                                otherGlobalVoxelPos = c_voxel_current[c] + vec3(0.0, 1.0, 0.0);
                                otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                                f = abs(diff.y);
                            } else if (clampedMin.z) {
                                otherGlobalVoxelPos = c_voxel_current[c] - vec3(0.0, 0.0, 1.0);
                                otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                                f = abs(diff.z);
                            } else if (clampedMax.z) {
                                otherGlobalVoxelPos = c_voxel_current[c] + vec3(0.0, 0.0, 1.0); 
                                otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                                f = abs(diff.z);
                            }

                            // Sample the neighboring voxel
                            vec3 otherPTcoord = getBrickFromNormalized(otherP, c_res_current[c]);
                            otherPTcoord = getBrickFromVoxel(otherGlobalVoxelPos, c_res_current[c]);
                            vec3 otherVoxelInBrick = mod(otherGlobalVoxelPos, 32.0);
                            otherVoxelInBrick -= diff;

                            // Check if neighbor is outside volume bounds
                            if (otherP.x < 0.0 || otherP.x >= 1.0 || otherP.y < 0.0 || otherP.y >= 1.0 || otherP.z < 0.0 || otherP.z >= 1.0) {
                                otherVoxelVal = val;
                            } else if (otherPTcoord == c_PT_XYZ_adjacent[c].xyz && c_brick_XYZ_adjacent[c].w >= 0.0) {
                                // Use cached adjacent brick
                                otherVoxelVal = sampleBrick(c_brick_XYZ_adjacent[c].xyz, otherVoxelInBrick);
                            } else {
                                // Load new adjacent brick
                                ivec4 otherBrickCacheInfo = ivec4(-1);
                                if (otherPTcoord == c_PT_XYZ_adjacent[c].xyz) {
                                    otherBrickCacheInfo = ivec4(c_brick_XYZ_adjacent[c]);
                                } else {
                                    otherBrickCacheInfo = getBrickLocation(otherP, c_res_current[c], slot, rnd, false, c); 
                                }
                                if (otherBrickCacheInfo.w == -1 || otherBrickCacheInfo.w == -2) {
                                    otherVoxelVal = val;
                                } else if (otherBrickCacheInfo.w == -3) {
                                    otherVoxelVal = 1.0;
                                } else if (otherBrickCacheInfo.w == -4) {
                                    otherVoxelVal = float(otherBrickCacheInfo.x);
                                } else {
                                    // TODO: we do not recalculate the voxelInBrick based on the resolution
                                    otherVoxelVal = sampleBrick(vec3(otherBrickCacheInfo.xyz), otherVoxelInBrick);
                                }
                                c_PT_XYZ_adjacent[c] = getBrickFromVoxel(otherGlobalVoxelPos, c_res_current[c]); 
                                c_brick_XYZ_adjacent[c] = vec4(otherBrickCacheInfo);
                            }
                            
                            // Perform linear interpolation
                            float originalVal = val;
                            val = lerp(originalVal, otherVoxelVal, f);                            
                        } else if (boundaryAxes == 2) {
                            // Bilinear interpolation across two boundaries
                            vec3 offA = vec3(0.0);
                            vec3 offB = vec3(0.0);
                            vec2 f = vec2(0.0);

                            // Determine which two axes we're interpolating across
                            if (clamped.x && clamped.y) {
                                offA.x = clampedMin.x ? -1.0 : 1.0;
                                offB.y = clampedMin.y ? -1.0 : 1.0;
                                f = vec2(abs(diff.x), abs(diff.y));
                            } else if (clamped.x && clamped.z) {
                                offA.x = clampedMin.x ? -1.0 : 1.0;
                                offB.z = clampedMin.z ? -1.0 : 1.0;
                                f = vec2(abs(diff.x), abs(diff.z));
                            } else if (clamped.y && clamped.z) {
                                offA.y = clampedMin.y ? -1.0 : 1.0;
                                offB.z = clampedMin.z ? -1.0 : 1.0;
                                f = vec2(abs(diff.y), abs(diff.z));
                            }

                            // Macro for sampling at offset positions
                            #define SAMPLE_AT_OFFSET(OFF, DEST)                                                                     {                                                                                                           vec3 otherGlobalVoxelPos = c_voxel_current[c] + (OFF);                                                  vec3 otherP              = getNormalizedFromVoxel(                                                                                   otherGlobalVoxelPos, c_res_current[c]);                                                                                                                                            if ( any(lessThan(otherP, vec3(0.0)))                                                                     || any(greaterThanEqual(otherP, vec3(1.0))) ) {                                                           DEST = val;                                                                                         } else {                                                                                                    vec3 otherPTcoord      = getBrickFromNormalized(                                                                                    otherP, c_res_current[c]);                                                 vec3 otherVoxelInBrick = mod(otherGlobalVoxelPos, 32.0) - diff;                                                                                                                                                 bool matched = false;                                                                                   if (otherPTcoord == c_PT_X_adjacent[c].xyz && c_brick_X_adjacent[c].w >= 0.0)   {                                                                 DEST = sampleBrick(c_brick_X_adjacent[c].xyz, otherVoxelInBrick);                                           matched = true;                                                                                     } else if (otherPTcoord == c_PT_Y_adjacent[c].xyz && c_brick_Y_adjacent[c].w >= 0.0) {                                                            DEST = sampleBrick(c_brick_Y_adjacent[c].xyz, otherVoxelInBrick);                                           matched = true;                                                                                     } else if (otherPTcoord == c_PT_Z_adjacent[c].xyz && c_brick_Z_adjacent[c].w >= 0.0) {                                                            DEST = sampleBrick(c_brick_Z_adjacent[c].xyz, otherVoxelInBrick);                                           matched = true;                                                                                     } else if (otherPTcoord == c_PT_XYZ_adjacent[c].xyz && c_brick_XYZ_adjacent[c].w >= 0.0) {                                                          DEST = sampleBrick(c_brick_XYZ_adjacent[c].xyz, otherVoxelInBrick);                                         matched = true;                                                                                     }                                                 ivec4 info = ivec4(-1);                                     if (otherPTcoord == c_PT_X_adjacent[c].xyz) { info = ivec4(c_brick_X_adjacent[c]); }                                     else if (otherPTcoord == c_PT_Y_adjacent[c].xyz) { info = ivec4(c_brick_Y_adjacent[c]); }                                     else if (otherPTcoord == c_PT_Z_adjacent[c].xyz) { info = ivec4(c_brick_Z_adjacent[c]); }                                     else if (otherPTcoord == c_PT_XYZ_adjacent[c].xyz) { info = ivec4(c_brick_XYZ_adjacent[c]); }                                     else { info = getBrickLocation(otherP, c_res_current[c], slot, rnd, false, c); }                                                                         if (!matched) {                                                                                             if (info.w == -1 || info.w == -2) {                                                                        DEST = val;                                                                                         } else if (info.w == -3) {                                                                                  DEST = 1.0;                                                                                         } else if (info.w == -4) {                                                                                  DEST = float(info.x);                                                                               } else {                                                                                                    DEST = sampleBrick(vec3(info.xyz), otherVoxelInBrick);                                              }                                                                                                       if (abs((OFF).x) > 0.5 && abs((OFF).y) < 0.5 && abs((OFF).z) < 0.5) {                                                         c_PT_X_adjacent[c]  = otherPTcoord;                                                                                 c_brick_X_adjacent[c] = vec4(info);                                                                         } else if (abs((OFF).y) > 0.5 && abs((OFF).x) < 0.5 && abs((OFF).z) < 0.5) {                                                  c_PT_Y_adjacent[c]  = otherPTcoord;                                                                                 c_brick_Y_adjacent[c] = vec4(info);                                                                         } else if (abs((OFF).z) > 0.5 && abs((OFF).x) < 0.5 && abs((OFF).y) < 0.5) {                                                  c_PT_Z_adjacent[c]  = otherPTcoord;                                                                                 c_brick_Z_adjacent[c] = vec4(info);                                                                         } else {                                                                                                              c_PT_XYZ_adjacent[c]     = otherPTcoord;                                                                    c_brick_XYZ_adjacent[c]  = vec4(info);                                                              }                                                                                                           }                                                                                                   }                                                                                                   }
                            
                            // Sample the four corners for bilinear interpolation
                            float v00 = val;
                            float v10; float v01; float v11;
                            SAMPLE_AT_OFFSET(offA, v10);
                            SAMPLE_AT_OFFSET(offB, v01);
                            SAMPLE_AT_OFFSET(offA + offB, v11);

                            val = bilerp(v00, v10, v01, v11, f);

                            #undef SAMPLE_AT_OFFSET

                        } else if (boundaryAxes == 3) {
                            // Trilinear interpolation across all three boundaries
                            
                            vec3 offA = vec3(0.0);
                            vec3 offB = vec3(0.0);
                            vec3 offC = vec3(0.0);
                            vec3 f = vec3(0.0);

                            offA.x = clampedMin.x ? -1.0 : 1.0;
                            offB.y = clampedMin.y ? -1.0 : 1.0;
                            offC.z = clampedMin.z ? -1.0 : 1.0;

                            f = vec3(abs(diff.x), abs(diff.y), abs(diff.z));

                            // Macro for sampling at offset positions
                            #define SAMPLE_AT_OFFSET(OFF, DEST)                                 {                                     vec3 otherGlobalVoxelPos = c_voxel_current[c] + (OFF);                                     vec3 otherP = getNormalizedFromVoxel(otherGlobalVoxelPos, c_res_current[c]);                                     if (any(lessThan(otherP, vec3(0.0))) || any(greaterThanEqual(otherP, vec3(1.0)))) {                                         DEST = val;                                     } else {                                         vec3 otherPTcoord      = getBrickFromNormalized(otherP, c_res_current[c]);                                                     vec3 otherVoxelInBrick = mod(otherGlobalVoxelPos, 32.0) - diff;                                             if (otherPTcoord == c_PT_X_adjacent[c] && c_brick_X_adjacent[c].w >= 0.0)   {                                                                     DEST = sampleBrick(c_brick_X_adjacent[c].xyz, otherVoxelInBrick);                                           } else if (otherPTcoord == c_PT_Y_adjacent[c].xyz && c_brick_Y_adjacent[c].w >= 0.0) {                                                                DEST = sampleBrick(c_brick_Y_adjacent[c].xyz, otherVoxelInBrick);                                           } else if (otherPTcoord == c_PT_Z_adjacent[c].xyz && c_brick_Z_adjacent[c].w >= 0.0) {                                                                DEST = sampleBrick(c_brick_Z_adjacent[c].xyz, otherVoxelInBrick);                                           } else if (otherPTcoord == c_PT_XYZ_adjacent[c].xyz && c_brick_XYZ_adjacent[c].w >= 0.0) {                                                              DEST = sampleBrick(c_brick_XYZ_adjacent[c].xyz, otherVoxelInBrick);                                         } else {                                                                                                           ivec4 otherBrickCacheInfo = getBrickLocation(otherP, c_res_current[c], slot, rnd, false, c);                                             vec3 otherVoxelInBrick = mod(otherGlobalVoxelPos, 32.0) - diff;                                             if (otherBrickCacheInfo.w == -1 || otherBrickCacheInfo.w == -2) {                                                 DEST = val;                                             } else if (otherBrickCacheInfo.w == -3) {                                                 DEST = 1.0;                                             } else if (otherBrickCacheInfo.w == -4) {                                                 DEST = float(otherBrickCacheInfo.x);                                             } else {                                                 DEST = sampleBrick(vec3(otherBrickCacheInfo.xyz), otherVoxelInBrick);                                             }                                         }                                     }                                 }
                            
                            // Sample all eight corners for trilinear interpolation
                            float v000 = val;
                            float v100; float v010; float v001; float v110; float v101; float v011; float v111;
                            SAMPLE_AT_OFFSET(offA, v100);
                            SAMPLE_AT_OFFSET(offB, v010);
                            SAMPLE_AT_OFFSET(offC, v001);
                            SAMPLE_AT_OFFSET(offA + offB, v110);
                            SAMPLE_AT_OFFSET(offA + offC, v101);
                            SAMPLE_AT_OFFSET(offB + offC, v011);
                            SAMPLE_AT_OFFSET(offA + offB + offC, v111);

                            val = trilerp(v000, v100, v010, v001, v110, v101, v011, v111, f);

                            #undef SAMPLE_AT_OFFSET
                            
                        }

                    } else {
                        // No boundary interpolation needed - clear adjacent brick cache.
                        // no adjacent bricks -> reset the adjacent trackers
                        c_PT_X_adjacent[c] = c_PT_Y_adjacent[c] = c_PT_Z_adjacent[c] = c_PT_XYZ_adjacent[c] = vec3(-1.0);
                        c_brick_X_adjacent[c] = c_brick_Y_adjacent[c] = c_brick_Z_adjacent[c] = c_brick_XYZ_adjacent[c] = vec4(-1.0);
                    }
                }

                // ========================================
                // VALUE NORMALIZATION AND TRACKING
                // ========================================
                
                // Normalize value to 0-1 range using channel-specific contrast limits.
                // we normalize the (accumulated) value to the range of the color channel
                c_val_current[c] = max(0.0, (val - getClim(c).x) / (getClim(c).y - getClim(c).x));

                // Track min/max values for MIP/MinIP rendering.
                // update the min and max values for the min/max projection
                if (c_minVal[c] == -1.0) {
                    c_minVal[c] = c_val_current[c];
                } else {
                    c_minVal[c] = min(c_minVal[c], c_val_current[c]);
                }
                c_maxVal[c] = max(c_maxVal[c], c_val_current[c]);

            }

            // ========================================
            // BRICK REQUEST GENERATION
            // ========================================
            
            // Request higher resolution bricks if we're using lower resolution than optimal.
            // potentially overwrite brick request
            if (!overWrittenRequest 
                && c_res_current[c] != bestRes
                && c_val_current[c] > 0.0
                && c_renderMode_current[c] == 2
                && int(floor(rnd * float(maxChannels))) == c) {
                setBrickRequest(p, bestRes, slot, rnd);
                overWrittenRequest = true;
            }

            // ========================================
            // CHANNEL COMPOSITING
            // ========================================
            
            // Accumulate this channel's contribution.
            // sum up the values onto the slice values
            total += c_val_current[c];
            rgbCombo += c_val_current[c] * c_color[c];

        }

        // ========================================
        // FRONT-TO-BACK COMPOSITING
        // ========================================
        
        // Clamp total intensity and calculate alpha.
        // add the calculated slice to the total color
        total = clamp(total, 0.0, 1.0);
        sliceAlpha = total * opacity * dt * 32.0;  // Scale by step size and brick size
        sliceColor = rgbCombo;

        // Front-to-back alpha blending
        outColor.rgb += sliceAlpha * alphaMultiplicator * sliceColor;
        outColor.a += sliceAlpha * alphaMultiplicator;
        alphaMultiplicator *= (1.0 - sliceAlpha);

        // Early termination for opaque regions (standard rendering only).
        // check if we can exit early
        if (outColor.a > 0.99 && u_renderstyle == 0) { break; }

        // ========================================
        // ADVANCE RAY POSITION
        // ========================================
        
        // Move to next sample position
        t += dt;
        p += dp;
        t_os += dt;
    }

    // ========================================
    // RENDERING STYLE POST-PROCESSING
    // ========================================
    
    if (u_renderstyle == 1) { 
        // Minimum Intensity Projection (MinIP)
        // Shows the minimum value encountered along each ray
        outColor = vec4(0.0);
        for (int c = 0; c < 7; c++) {
            if (c_color[c] != vec3(0.0, 0.0, 0.0)) {
                outColor.rgb += c_minVal[c] * c_color[c];
                outColor.a += c_minVal[c];
            }
        }
    } else if (u_renderstyle == 0) { 
        // Maximum Intensity Projection (MIP)
        // Shows the maximum value encountered along each ray
        outColor = vec4(0.0);
        for (int c = 0; c < 7; c++) {
            if (c_color[c] != vec3(0.0, 0.0, 0.0)) {
                outColor.rgb += c_maxVal[c] * c_color[c];
            }
        }
        outColor.a = 1.0;
    }

    // ========================================
    // FINAL OUTPUT
    // ========================================
    
    // Convert from linear to sRGB color space and set all render targets
    gColor = vec4(linear_to_srgb(outColor.r), 
                  linear_to_srgb(outColor.g), 
                  linear_to_srgb(outColor.b), 
                  outColor.a);
    
}
`,Ze={uniforms:{u_size:{value:new R(1,1,1)},clim0:{value:new b(.2,.8)},clim1:{value:new b(.2,.8)},clim2:{value:new b(.2,.8)},clim3:{value:new b(.2,.8)},clim4:{value:new b(.2,.8)},clim5:{value:new b(.2,.8)},clim6:{value:new b(.2,.8)},clim7:{value:new b(.2,.8)},xClip:{value:new b(0,1e6)},yClip:{value:new b(0,1e6)},zClip:{value:new b(0,1e6)},u_window_size:{value:new b(1,1)},u_vol_scale:{value:new R(1,1,1)},u_renderstyle:{value:2},brickCacheTex:{type:"sampler3D",value:null},pageTableTex:{type:"usampler3D",value:null},color0:{value:new V(0,0,0)},color1:{value:new V(0,0,0)},color2:{value:new V(0,0,0)},color3:{value:new V(0,0,0)},color4:{value:new V(0,0,0)},color5:{value:new V(0,0,0)},color6:{value:new V(0,0,0)},channelMapping:{value:[-1,-1,-1,-1,-1,-1,-1]},resGlobal:{value:new b(0,9)},res0:{value:new b(0,9)},res1:{value:new b(0,9)},res2:{value:new b(0,9)},res3:{value:new b(0,9)},res4:{value:new b(0,9)},res5:{value:new b(0,9)},res6:{value:new b(0,9)},maxChannels:{value:0},lodFactor:{value:1},near:{value:.1},far:{value:1e4},opacity:{value:1},volumeCount:{value:0},boxSize:{value:new R(1,1,1)},renderRes:{value:1e3},voxelExtents:{value:new R(1,1,1)},anchor0:{value:new R(0,0,0)},anchor1:{value:new R(0,0,0)},anchor2:{value:new R(0,0,0)},anchor3:{value:new R(0,0,0)},anchor4:{value:new R(0,0,0)},anchor5:{value:new R(0,0,0)},anchor6:{value:new R(0,0,0)},anchor7:{value:new R(0,0,0)},anchor8:{value:new R(0,0,0)},anchor9:{value:new R(0,0,0)},scale0:{value:new R(1,1,1)},scale1:{value:new R(2,2,2)},scale2:{value:new R(4,4,4)},scale3:{value:new R(8,8,8)},scale4:{value:new R(16,16,16)},scale5:{value:new R(32,32,32)},scale6:{value:new R(64,64,64)},scale7:{value:new R(128,128,128)},scale8:{value:new R(256,256,256)},scale9:{value:new R(512,512,512)}},vertexShader:Ge,fragmentShader:Xe};function U(h){ne(oe.DEBUG)&&console.warn(`%cRM: ${h}`,"background: orange; color: white; padding: 2px; border-radius: 3px;")}function J(h,t){return h/t[1]}class je{constructor(){U("Initializing VolumeRenderManager"),this.uniforms=null,this.shader=null,this.meshScale=[1,1,1],this.geometrySize=[1,1,1],this.boxSize=[1,1,1],this.zarrInit=!1,this.channelsVisible=[],this.channelTargetC=[],this.zarrStoreNumResolutions=null,this.channelMaxResolutionIndex=[],this.colors=[],this.contrastLimits=[],this.layerTransparency=1,this.xSlice=new b(-1,1e5),this.ySlice=new b(-1,1e5),this.zSlice=new b(-1,1e5),this.originalScale=[1,1,1],this.physicalDimensions=[1,1,1],this.maxResolution=[1,1,1],this.maxRange=255,this.maxRangeSet=!1,this.initializeShader()}initializeShader(){U("Initializing shader"),this.shader=Ze,this.uniforms=ke.clone(this.shader.uniforms)}extractRenderingSettingsFromProps(t){U("Extracting rendering settings from props");const{images:e={},imageLayerScopes:n=[],imageLayerCoordination:a=[{}],imageChannelScopesByLayer:r={},imageChannelCoordination:i=[{}],spatialRenderingMode:s}=t,u=n[0];if(!u)return{valid:!1};const c=r[u],g=a[0][u],m=i[0][u],l=e[u]?.image?.instance?.getData();if(!l)return{valid:!1};if(!m[c?.[0]][D.SPATIAL_CHANNEL_WINDOW])return{valid:!1};const d=e[u].image.instance,v=s==="3D",f=g[D.PHOTOMETRIC_INTERPRETATION]==="RGB",x=g[D.SPATIAL_LAYER_VISIBLE],E=g[D.SPATIAL_LAYER_OPACITY],C=f?[[255,0,0],[0,255,0],[0,0,255]]:c.map(z=>m[z][D.SPATIAL_CHANNEL_COLOR]),y=f?[[0,255],[0,255],[0,255]]:c.map(z=>m[z][D.SPATIAL_CHANNEL_WINDOW]||[0,255]);this.maxRangeSet||(this.maxRange=Math.max(...y.map(z=>z[1])),this.maxRangeSet=!0);const X=f?[x&&!0,x&&!0,x&&!0]:c.map(z=>x&&m[z][D.SPATIAL_CHANNEL_VISIBLE]),K=f?[x&&!0,x&&!0,x&&!0]:c.map(z=>x&&d.getChannelIndex(m[z][D.SPATIAL_TARGET_C])),Z=f?[x&&null,x&&null,x&&null]:c.map(z=>m[z][D.SPATIAL_MAX_RESOLUTION]);let P=g[D.SPATIAL_SLICE_X],A=g[D.SPATIAL_SLICE_Y],N=g[D.SPATIAL_SLICE_Z];P=P!==null?P:new b(-1,1e5),A=A!==null?A:new b(-1,1e5),N=N!==null?N:new b(-1,1e5);const j=e[u].image.loaders[0].channels;return{valid:!0,channelsVisible:X,allChannels:j,channelTargetC:K,channelMaxResolutionIndex:Z,data:l,colors:C,contrastLimits:y,is3dMode:v,layerTransparency:E,xSlice:P,ySlice:A,zSlice:N}}updateFromProps(t){U("Updating from props");const e=this.extractRenderingSettingsFromProps(t);return e.valid?(this.channelsVisible=e.channelsVisible,this.channelTargetC=e.channelTargetC,this.channelMaxResolutionIndex=e.channelMaxResolutionIndex,this.colors=e.colors,this.contrastLimits=e.contrastLimits,this.renderingMode=e.renderingMode,this.layerTransparency=e.layerTransparency,this.xSlice=e.xSlice,this.ySlice=e.ySlice,this.zSlice=e.zSlice,!0):!1}updateRendering({zarrStoreShapes:t,originalScaleXYZ:e,physicalDimensionsXYZ:n,maxResolutionXYZ:a,boxDimensionsXYZ:r,normalizedScaleXYZ:i,bcTHREE:s,ptTHREE:u}){if(U("Updating rendering"),this.channelTargetC.findIndex((v,f)=>this.channelsVisible[f]),!Array.isArray(t)||t.length===0)return null;const c=t[0],g={xLength:c[4]||1,yLength:c[3]||1,zLength:c[2]||1},m=[],l=[],d=[];if(this.channelTargetC.forEach((v,f)=>{this.channelsVisible[f];{const x=[0,this.maxRange?this.maxRange:255];l.push([this.colors[f][0]/255,this.colors[f][1]/255,this.colors[f][2]/255,this.channelsVisible[f]?1:0]),o.debug("colorsSave",l),this.contrastLimits[f][0]===0&&this.contrastLimits[f][1]===255?d.push([J(x[0],x),J(x[1],x)]):d.push([J(this.contrastLimits[f][0],x),J(this.contrastLimits[f][1],x)])}}),!this.zarrInit){this.originalScale=e,this.physicalDimensions=n,this.maxResolution=a;const v=r;this.normalizedScale=i,this.meshScale=[this.originalScale[0]/this.originalScale[0],this.originalScale[1]/this.originalScale[0],this.originalScale[2]/this.originalScale[0]],this.geometrySize=v,this.boxSize=v,o.debug("this.boxSize",this.boxSize),o.debug("this.geometrySize",this.geometrySize),o.debug("this.meshScale",this.meshScale),o.debug("this.originalScale",this.originalScale),o.debug("this.physicalDimensions",this.physicalDimensions),o.debug("this.maxResolution",this.maxResolution),o.debug("scaledResolution",v),this.zarrInit=!0}return this.updateUniforms(m,g,this.renderingMode,d,l,this.layerTransparency,this.xSlice,this.ySlice,this.zSlice,s,u),{uniforms:this.uniforms,shader:this.shader,meshScale:this.meshScale,geometrySize:this.geometrySize,boxSize:this.boxSize}}updateUniforms(t,e,n,a,r,i,s,u,c,g,m){U("Updating uniforms"),this.uniforms.boxSize.value.set(this.boxSize[0],this.boxSize[1],this.boxSize[2]),this.uniforms.brickCacheTex.value=g,this.uniforms.pageTableTex.value=m,this.uniforms.near.value=.1,this.uniforms.far.value=3e3,this.uniforms.opacity.value=i,this.uniforms.volumeCount.value=t.length,this.uniforms.u_size.value.set(e.xLength,e.yLength,e.zLength),this.uniforms.u_window_size.value.set(0,0),this.uniforms.u_vol_scale.value.set(1/e.xLength,1/e.yLength,1/e.zLength*2),this.uniforms.clim0.value.set(a.length>0?a[0][0]:null,a.length>0?a[0][1]:null),this.uniforms.clim1.value.set(a.length>1?a[1][0]:null,a.length>1?a[1][1]:null),this.uniforms.clim2.value.set(a.length>2?a[2][0]:null,a.length>2?a[2][1]:null),this.uniforms.clim3.value.set(a.length>3?a[3][0]:null,a.length>3?a[3][1]:null),this.uniforms.clim4.value.set(a.length>4?a[4][0]:null,a.length>4?a[4][1]:null),this.uniforms.clim5.value.set(a.length>5?a[5][0]:null,a.length>5?a[5][1]:null),this.uniforms.clim6.value.set(a.length>6?a[6][0]:null,a.length>6?a[6][1]:null),this.uniforms.xClip.value.set(s[0]*(1/this.maxResolution[0])*this.boxSize[0],s[1]*(1/this.maxResolution[0])*this.boxSize[0]),this.uniforms.yClip.value.set(u[0]*(1/this.maxResolution[1])*this.boxSize[1],u[1]*(1/this.maxResolution[1])*this.boxSize[1]),this.uniforms.zClip.value.set(c[0]*(1/this.maxResolution[2])*this.boxSize[2],c[1]*(1/this.maxResolution[2])*this.boxSize[2]),this.uniforms.color0.value.set(r.length>0?r[0][0]:null,r.length>0?r[0][1]:null,r.length>0?r[0][2]:null,r.length>0?r[0][3]:null),this.uniforms.color1.value.set(r.length>1?r[1][0]:null,r.length>1?r[1][1]:null,r.length>1?r[1][2]:null,r.length>1?r[1][3]:null),this.uniforms.color2.value.set(r.length>2?r[2][0]:null,r.length>2?r[2][1]:null,r.length>2?r[2][2]:null,r.length>2?r[2][3]:null),this.uniforms.color3.value.set(r.length>3?r[3][0]:null,r.length>3?r[3][1]:null,r.length>3?r[3][2]:null,r.length>3?r[3][3]:null),this.uniforms.color4.value.set(r.length>4?r[4][0]:null,r.length>4?r[4][1]:null,r.length>4?r[4][2]:null,r.length>4?r[4][3]:null),this.uniforms.color5.value.set(r.length>5?r[5][0]:null,r.length>5?r[5][1]:null,r.length>5?r[5][2]:null,r.length>5?r[5][3]:null),this.uniforms.color6.value.set(r.length>6?r[6][0]:null,r.length>6?r[6][1]:null,r.length>6?r[6][2]:null,r.length>6?r[6][3]:null);for(let l=0;l<7;l++)typeof this.channelMaxResolutionIndex[l]=="number"&&this.uniforms[`res${l}`].value.set(Math.max(1,this.channelMaxResolutionIndex[l]),this.zarrStoreNumResolutions-1)}setChannelMapping(t){U("setting channel mapping"),o.debug("channelMapping",t),this.uniforms.channelMapping.value=t}setZarrUniforms(t,e){U("setting zarr uniforms"),o.debug("zarrStore",t),o.debug("PT",e);for(let n=0;n<=9;n++)e.anchors&&e.anchors[n]?this.uniforms[`anchor${n}`].value.set(e.anchors[n][0]||0,e.anchors[n][1]||0,e.anchors[n][2]||0):(o.debug("anchor",n,"does not exist"),this.uniforms[`anchor${n}`].value.set(0,0,0)),t.scales&&t.scales[n]?this.uniforms[`scale${n}`].value.set(t.scales[n][0]||1,t.scales[n][1]||1,t.scales[n][2]||1):o.debug("scale",n,"does not exist");o.debug("zarrStore.brickLayout",t.brickLayout),this.zarrStoreNumResolutions=t.brickLayout.length;for(let n=0;n<7;n++)this.uniforms[`res${n}`].value.set(1,t.brickLayout.length-1);this.uniforms.resGlobal.value.set(1,t.brickLayout.length-1),this.uniforms.voxelExtents.value.set(t.shapes[0][4],t.shapes[0][3],t.shapes[0][2]),this.uniforms.maxChannels.value=Math.min(t.channelCount,7),o.debug("this.channelsVisible",this.channelsVisible),o.debug("zarrStore.shapes[0]",t.shapes[0]),o.debug("PT",e),o.debug("uniforms",this.uniforms)}}const qe=`//
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`,Ye=`//
// Input texture to blur
uniform sampler2D tDiffuse;
// Resolution of the texture (width, height)
uniform vec2 resolution;
// Blur strength: 1=no blur, 2-3=3x3 kernel, 4-5=5x5 kernel, 6+=7x7 kernel
uniform int gaussian;
// Texture coordinates for current pixel
varying vec2 vUv;

/**
 * No blur - returns the original pixel color
 */
vec4 noGaussian() {
    vec4 color = texture2D(tDiffuse, vUv);
    return color;
}

/**
 * Applies 3x3 Gaussian blur kernel
 * Samples 9 pixels in a 3x3 grid around the current pixel
 * Weights are based on 2D Gaussian distribution
 */
vec4 gaussian3(vec2 texel) {
    vec4 color = vec4(0.0);

    // Top row: weights [0.0625, 0.125, 0.0625]
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0, -1.0)) * 0.0625;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0, -1.0)) * 0.125;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0, -1.0)) * 0.0625;

    // Middle row: weights [0.125, 0.25, 0.125] (center pixel gets highest weight)
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  0.0)) * 0.125;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  0.0)) * 0.25;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  0.0)) * 0.125;

    // Bottom row: weights [0.0625, 0.125, 0.0625]
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  1.0)) * 0.0625;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  1.0)) * 0.125;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  1.0)) * 0.0625;

    return color;
}

/**
 * Applies 5x5 Gaussian blur kernel
 * Samples 25 pixels in a 5x5 grid around the current pixel
 * Weights sum to 1.0 (273/273) for proper normalization
 */
vec4 gaussian5(vec2 texel) {
    vec4 color = vec4(0.0);

    // Row 1: weights [1/273, 4/273, 7/273, 4/273, 1/273]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0, -2.0)) * 1.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0, -2.0)) * 4.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0, -2.0)) * 7.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0, -2.0)) * 4.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0, -2.0)) * 1.0/273.0;
    
    // Row 2: weights [4/273, 16/273, 26/273, 16/273, 4/273]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0, -1.0)) * 4.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0, -1.0)) * 16.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0, -1.0)) * 26.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0, -1.0)) * 16.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0, -1.0)) * 4.0/273.0;

    // Row 3 (center): weights [7/273, 26/273, 41/273, 26/273, 7/273]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0,  0.0)) * 7.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  0.0)) * 26.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  0.0)) * 41.0/273.0; // Center pixel
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  0.0)) * 26.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0,  0.0)) * 7.0/273.0;
    
    // Row 4: weights [4/273, 16/273, 26/273, 16/273, 4/273]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0,  1.0)) * 4.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  1.0)) * 16.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  1.0)) * 26.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  1.0)) * 16.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0,  1.0)) * 4.0/273.0;
    
    // Row 5: weights [1/273, 4/273, 7/273, 4/273, 1/273]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0,  2.0)) * 1.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  2.0)) * 4.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  2.0)) * 7.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  2.0)) * 4.0/273.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0,  2.0)) * 1.0/273.0;

    return color;
}

/**
 * Applies 7x7 Gaussian blur kernel
 * Samples 49 pixels in a 7x7 grid around the current pixel
 * Weights sum to 1.0 (1003/1003) for proper normalization
 * Creates the strongest blur effect
 */
vec4 gaussian7(vec2 texel) {
    vec4 color = vec4(0.0);

    // Row 1: weights [0, 0, 1/1003, 2/1003, 1/1003, 0, 0]
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0, -3.0)) * 1.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0, -3.0)) * 2.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0, -3.0)) * 1.0/1003.0;

    // Row 2: weights [0, 3/1003, 13/1003, 22/1003, 13/1003, 3/1003, 0]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0, -2.0)) * 3.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0, -2.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0, -2.0)) * 22.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0, -2.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0, -2.0)) * 3.0/1003.0;

    // Row 3: weights [1/1003, 13/1003, 59/1003, 97/1003, 59/1003, 13/1003, 1/1003]
    color += texture2D(tDiffuse, vUv + texel * vec2(-3.0, -1.0)) * 1.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0, -1.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0, -1.0)) * 59.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0, -1.0)) * 97.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0, -1.0)) * 59.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0, -1.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 3.0, -1.0)) * 1.0/1003.0;
    
    // Row 4 (center): weights [2/1003, 22/1003, 97/1003, 159/1003, 97/1003, 22/1003, 2/1003]
    color += texture2D(tDiffuse, vUv + texel * vec2(-3.0,  0.0)) * 2.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0,  0.0)) * 22.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  0.0)) * 97.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  0.0)) * 159.0/1003.0; // Center pixel
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  0.0)) * 97.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0,  0.0)) * 22.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 3.0,  0.0)) * 2.0/1003.0;
    
    // Row 5: weights [1/1003, 13/1003, 59/1003, 97/1003, 59/1003, 13/1003, 1/1003]
    color += texture2D(tDiffuse, vUv + texel * vec2(-3.0,  1.0)) * 1.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0,  1.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  1.0)) * 59.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  1.0)) * 97.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  1.0)) * 59.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0,  1.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 3.0,  1.0)) * 1.0/1003.0;
    
    // Row 6: weights [0, 3/1003, 13/1003, 22/1003, 13/1003, 3/1003, 0]
    color += texture2D(tDiffuse, vUv + texel * vec2(-2.0,  2.0)) * 3.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  2.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  2.0)) * 22.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  2.0)) * 13.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 2.0,  2.0)) * 3.0/1003.0;

    // Row 7: weights [0, 0, 1/1003, 2/1003, 1/1003, 0, 0]
    color += texture2D(tDiffuse, vUv + texel * vec2(-1.0,  3.0)) * 1.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 0.0,  3.0)) * 2.0/1003.0;
    color += texture2D(tDiffuse, vUv + texel * vec2( 1.0,  3.0)) * 1.0/1003.0;

    return color;
}

/**
 * Main fragment shader function
 * Determines which blur kernel to apply based on the 'gaussian' uniform
 */
void main() {
    // Calculate the size of one texel (pixel) in texture coordinates
    vec2 texel = 1.0 / resolution;
    
    // Initialize output color (this line appears to be unused/debug code)
    vec4 color = vec4(1.0, 0.0, 0.0, 0.0);

    // TODO: remove these variables since not used
    bool left = vUv.x < 0.5;
    bool top = vUv.y < 0.5;

    if (gaussian > 1 && gaussian <= 3) {
        // Apply 3x3 Gaussian blur for values 2-3
        color = gaussian3(texel);
    } else if (gaussian > 3 && gaussian <= 5) {
        // Apply 5x5 Gaussian blur for values 4-5
        color = gaussian5(texel);
    } else if (gaussian > 5) {
        // Apply 7x7 Gaussian blur for values 6 and above
        color = gaussian7(texel);
    } else {
        // No blur for value 1 or less
        color = noGaussian();
    }

    // Output the final blurred color
    gl_FragColor = color;
}
`;function de(h,t){const e=h.properties?.get(t);return e?.framebuffer||e?.__webglFramebuffer||t.__webglFramebuffer}function H(h){ne(oe.DEBUG)&&console.warn(`%cV: ${h}`,"background: deeppink; color: white; padding: 2px; border-radius: 3px;")}function He(h,t,e,{mrtRef:n}){h.setRenderTarget(n.current),h.clear(!0,!0,!0),h.render(e,t)}function Ke(h,{screenSceneRef:t,screenCameraRef:e}){h.setRenderTarget(null),h.clear(!0,!0,!0),h.render(t.current,e.current)}function $e(h,{frameRef:t,dataManager:e,mrtRef:n,bufRequest:a,bufUsage:r}){const i=h.getContext(),s=t.current;e.noNewRequests===!0&&s%100===0&&s<500&&(e.noNewRequests=!1),e.triggerRequest===!0&&e.noNewRequests===!1?(i.bindFramebuffer(i.READ_FRAMEBUFFER,de(h,n.current)),i.readBuffer(i.COLOR_ATTACHMENT1),i.readPixels(0,0,n.current.width,n.current.height,i.RGBA,i.UNSIGNED_BYTE,a.current),e.processRequestData(a.current)):e.triggerUsage===!0&&e.noNewRequests===!1&&(i.bindFramebuffer(i.READ_FRAMEBUFFER,de(h,n.current)),i.readBuffer(i.COLOR_ATTACHMENT2),i.readPixels(0,0,n.current.width,n.current.height,i.RGBA,i.UNSIGNED_BYTE,r.current),e.processUsageData(r.current))}function We(h,t){const{invalidate:e,isInteracting:n,dataManager:a,spatialRenderingModeChanging:r,meshRef:i,stillRef:s,screenQuadRef:u,lastSampleRef:c,frameRef:g,lastFrameCountRef:m}=t;if(u.current&&(s.current?u.current.material.uniforms.gaussian.value=0:u.current.material.uniforms.gaussian.value=7),n){a.noNewRequests=!1,a.triggerUsage=!0;return}if(r)return;const l=i.current?.material?.uniforms,d=l?.renderRes?.value??a?.PT?.lowestDataRes;if(a.noNewRequests){d!==0?(l&&(l.renderRes.value=0),o.debug("Adaptive Quality: No new requests. Setting renderSpeed to 0 (best quality)."),s.current=!1,u.current.material.uniforms.gaussian.value=7,e()):s.current||(o.debug("Adaptive Quality: No new requests and already at best quality. Setting stillRef to true."),s.current=!0,u.current.material.uniforms.gaussian.value=0);return}s.current&&(s.current=!1,e());const v=h.getElapsedTime();if(v-c.current<1)return;const f=v-c.current,x=g.current-m.current;let E=0;f>0&&(E=x/f),c.current=v,m.current=g.current;const C=E>100&&d>0,y=E<30&&d<a.PT.lowestDataRes;if(C||y){const X=d+(y?1:-1);l&&(l.renderRes.value=X),e()}}function Qe(h){const{images:t,imageLayerScopes:e,imageLayerCoordination:n,imageChannelScopesByLayer:a,imageChannelCoordination:r,spatialRenderingMode:i,spatialRenderingModeChanging:s}=h,{gl:u}=ce(),c=ce(S=>S.invalidate),g=_.useRef(null),m=_.useRef(null),l=_.useRef(null),d=_.useRef(null),v=_.useRef(null),[f,x]=_.useState({uniforms:null,shader:null,meshScale:[1,1,1],geometrySize:[1,1,1]}),[E,C]=_.useState(!1),y=_.useRef(null),X=_.useRef(null),K=_.useRef(null),[Z,P]=_.useState(!1),A=_.useRef(null),N=_.useRef(!1),j=_.useRef(0),z=_.useRef(0),me=_.useRef(0),p=_.useMemo(()=>new Ve(u),[u]),w=_.useMemo(()=>new je,[]);_.useEffect(()=>{H("useEffect MRT target matching canvas");const{width:S,height:O}=u.domElement,F=new be(S,O,3);F.texture.forEach(Y=>{Y.format=_e,Y.type=ve,Y.minFilter=ee,Y.magFilter=ee,Y.generateMipmaps=!1});const B=new Re,W=new ye(-1,1,1,-1,.1,10);W.position.z=1;const Q=new Ee({uniforms:{tDiffuse:{value:F.texture[0]},resolution:{value:new b(S,O)},gaussian:{value:7}},vertexShader:qe,fragmentShader:Ye,transparent:!0}),q=new Se(new Ce(2,2),Q);return B.add(q),y.current=B,X.current=W,K.current=q,l.current=new Uint8Array(S*O*4),d.current=new Uint8Array(S*O*4),v.current=F,()=>{F.dispose(),Q.dispose(),q.geometry.dispose()}},[u]);const te=e?.[0],xe=t?.[te];a?.[te];const $=r?.[0]?.[te];_.useEffect(()=>{if(H("useEffect INIT"),!p||!w){o.debug("dataManager or renderManager not initialized yet");return}if(!xe){o.debug("no first image layer yet");return}if(!$){o.debug("no firstImageLayerChannelCoordination yet");return}(async()=>(p.initImages(t,e),await p.init($),w.setZarrUniforms(p.zarrStore,p.PT),w.setChannelMapping(p.channels.colorMappings),o.debug("rm.uniforms",w.uniforms)))()},[p,w,t,e]),_.useEffect(()=>{H("useEffect spatialRenderingMode");const S=i==="3D";if(C(S),S&&p&&w){const O={images:t,imageLayerScopes:e,imageLayerCoordination:n,imageChannelScopesByLayer:a,imageChannelCoordination:r,spatialRenderingMode:i};if(w.updateFromProps(O)){const{zarrInit:F}=w;F||(p.ptTHREE.needsUpdate=!1,p.bcTHREE.needsUpdate=!1,p.renderer.initTexture(p.bcTHREE),p.renderer.initTexture(p.ptTHREE),p.initTexture());const B=w.updateRendering({zarrStoreShapes:p.zarrStore.shapes,originalScaleXYZ:p.getOriginalScaleXYZ(),physicalDimensionsXYZ:p.getPhysicalDimensionsXYZ(),maxResolutionXYZ:p.getMaxResolutionXYZ(),boxDimensionsXYZ:p.getBoxDimensionsXYZ(),normalizedScaleXYZ:p.getNormalizedScaleXYZ(),bcTHREE:p.bcTHREE,ptTHREE:p.ptTHREE});B&&x(B)}}},[p,w,t,e,n,a,r,i]),_.useEffect(()=>{if(H("useEffect isInteracting"),Z){const S=m.current?.material?.uniforms;S&&(S.renderRes.value=p.PT.lowestDataRes),N.current=!1,c()}},[c,Z]),Ae((S,O,F)=>{if(!v.current||!p||!w)return;const{gl:B,camera:W,scene:Q,clock:q}=S;N.current||He(B,W,Q,{mrtRef:v}),Ke(B,{screenSceneRef:y,screenCameraRef:X}),$e(B,{frameRef:j,dataManager:p,mrtRef:v,bufRequest:l,bufUsage:d}),We(q,{invalidate:c,isInteracting:Z,dataManager:p,spatialRenderingModeChanging:s,meshRef:m,stillRef:N,screenQuadRef:K,lastSampleRef:z,frameRef:j,lastFrameCountRef:me}),j.current+=1},1);const ge=_.useCallback(S=>{P(!0)},[]),pe=_.useCallback(S=>{clearTimeout(A.current),A.current=setTimeout(()=>{P(!1)},300)},[]);return _.useEffect(()=>{H("useEffect firstImageLayerChannelCoordination"),P(!0),o.debug("something about channels changed"),p.updateChannels($),w.setChannelMapping(p.channels.colorMappings),clearTimeout(A.current),A.current=setTimeout(()=>{P(!1)},300)},[$]),!E||!p||!w?null:f.shader?I.jsxs("group",{children:[I.jsx(le,{enableDamping:!1,onStart:ge,onEnd:pe}),I.jsxs("mesh",{ref:m,scale:f.meshScale,children:[I.jsx("boxGeometry",{args:f.geometrySize}),I.jsx("shaderMaterial",{uniforms:f.uniforms,vertexShader:f.shader.vertexShader,fragmentShader:f.shader.fragmentShader,side:ze,transparent:!1,glslVersion:Te})]})]}):I.jsxs("group",{children:[I.jsxs("mesh",{children:[I.jsx("boxGeometry",{args:[1,1,1]}),I.jsx("meshBasicMaterial",{color:"#444",wireframe:!0})]}),I.jsx(le,{ref:g})]})}function tt(h){return I.jsx(Pe,{frameloop:"always",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",padding:0,margin:0},camera:{fov:50,up:[0,1,0],position:[0,0,4],near:.01,far:15},gl:{antialias:!0,logarithmicDepthBuffer:!1,preserveDrawingBuffer:!1,autoClear:!1},children:I.jsx(Qe,{...h})})}export{tt as SpatialWrapper};
