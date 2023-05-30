const deleteConcepto = document.querySelectorAll(".delConcepto");
const borrarCuenta = document.querySelector(".borrarCuenta");

/*
//  BORRAR UNA CUENTA
borrarCuenta.forEach((button) => {
  if (!button.hasListener) {
    button.addEventListener("click", borrarCuenta());
    button.hasListener = true;
  }
});

async function borrarCuenta() {
  console.log('heyyo')
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
