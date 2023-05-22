const deleteConcepto = document.querySelectorAll(".delConcepto");
const deleteCuentaButton = document.querySelector(".borrarCuenta");
deleteCuentaButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this cuenta?")) {
    const cuentaId = deleteCuentaButton.dataset.cuentaId;
    fetch(`/cuentas/borrarCuenta?cuentaId=${cuentaId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

/*
//  BORRAR UNA CUENTA
deleteCuenta.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", borrarCuenta);
    button.hasListener = true;
  }
});

async function borrarCuenta() {
  const urlParams = new URLSearchParams(window.location.search);
  const cuentaId = urlParams.get("cuentaId");
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
    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
}

*/


/*
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
*/

//  BORRAR UN CONCEPTO

deleteConcepto.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", borrarConcepto);
    button.hasListener = true;
  }
});

async function borrarConcepto() {
  const conceptoId = this.parentNode.dataset.id;
  try {
    const response = await fetch("/conceptos/borrarConcepto", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        conceptoId: conceptoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// Cambiar clase de link activo en header
const linkActivo = location.href;
const linksDelHeader = document.querySelectorAll("a.nav-link");

for (let i = 0; i < linksDelHeader.length; i++) {
  const linkHref = linksDelHeader[i].href;
  if (
    linkActivo === linkHref ||
    (linkActivo.endsWith("/") && linkHref.endsWith("/")) ||
    linkActivo.endsWith(linkHref)
  ) {
    linksDelHeader[i].classList.add("active");
  }
}
