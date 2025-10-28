// Helper para construir URLs de Cloudinary con transformaciones.
// Maneja 3 casos:
//
// 1) public_id de tu cuenta (ej: "acuiferos/ic1")  -> image/upload
// 2) URL absoluta NO Cloudinary                    -> image/fetch
// 3) URL absoluta de Cloudinary (image/upload/...) -> inyecta las transformaciones en la URL
//
export const cld = (pid, tx = "f_auto,q_auto,dpr_auto") => {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloud) return "";

  // Caso 3: ya es una URL de Cloudinary (mejor insertar transform directamente)
  const cloudinaryUploadPrefix = `https://res.cloudinary.com/${cloud}/image/upload/`;
  if (typeof pid === "string" && pid.startsWith(cloudinaryUploadPrefix)) {
    // Insertamos `tx` justo después de /upload/
    const rest = pid.slice(cloudinaryUploadPrefix.length); // vNNNN/xxx o xxx
    // Evita duplicar si el tx ya existe (simple check)
    if (rest.startsWith(tx + "/")) return pid; 
    return `${cloudinaryUploadPrefix}${tx}/${rest}`;
  }

  // Caso 2: URL absoluta (no Cloudinary) -> fetch
  const isAbsolute = /^https?:\/\//i.test(pid);
  if (isAbsolute) {
    return `https://res.cloudinary.com/${cloud}/image/fetch/${tx}/${pid}`;
  }

  // Caso 1: public_id
  return `https://res.cloudinary.com/${cloud}/image/upload/${tx}/${pid}`;
};
