const deleteCuenta = document.querySelectorAll(".del");
const deleteComprobante = document.querySelectorAll(".delComprobante");


//  BORRAR UNA CUENTA

deleteCuenta.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", borrarCuenta);
    button.hasListener = true;
  }
});

async function borrarCuenta() {
  const cuentaId = this.parentNode.dataset.id;
  try {
    const response = await fetch("/cuentas/borrarCuenta", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        cuentaId: cuentaId,
      }),
    }); 
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}


    // BORRAR UN COMPROBANTE
deleteComprobante.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", borrarComprobante);
    button.hasListener = true;
  }
});

async function borrarComprobante() {
  const comprobanteId = this.parentNode.dataset.id;
  try {
    const response = await fetch("/comprobantes/borrarComprobante", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        comprobanteId: comprobanteId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}