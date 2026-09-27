// Public business details. The site deliberately shows NO email or phone:
// requests and messages are sent privately through /api/import-request.
//
// `address`: fill in the street address when ready (e.g. "Calle …, 38001
// Santa Cruz de Tenerife"). While empty, the footer shows only the island.
export const site = {
  address: "",
  docs: {
    presentation: "/docs/vals-proceso-de-compra.pdf",
    requestForm: "/docs/vals-formulario-solicitud.pdf",
  },
} as const;
