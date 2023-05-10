import { Cex, CexId } from "@/types/cex";

export const cexes: Record<CexId, Cex> = {
    coinbase: {
      id: "coinbase",
      name: "Coinbase",
      imageUrl: "https://s3-alpha-sig.figma.com/img/ae4f/cbc9/c822b65213f0c57be4d83bc620be5943?Expires=1684713600&Signature=L~tl7Z3Z2DWCy4Hwt6n70wGpVVRXSA0cIaevt5BdGWpHYY2kK2oZhNn0i3GYOgvP1Tz2x8tyN~bnBqe3BCYTW-SmyKyubM-Rb6btiZeMh9LABYmZI3MzXVYkH0B8HX3CeO3sij17YgSbil8b5bZgXRGztiQk325erGZRfmhz9tz44MypTj25V3VAIJ8pSAMC~urZ8nGKbpWaCCUYjScS0So9No39S1Td7sderyrVCruFimknV9VkaEk9nfrut~y573loV82qrcxdhcd35mm9g0VDL5f2T5xQhVPKIt5GqLb5OqxeC6w5ttE5tV~8UWoyauqkaonG6b6kMuKEXTW1rw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    binance: {
      id: "binance",
      name: "Binance",
      imageUrl: "https://s3.cointelegraph.com/storage/uploads/view/f90d3fbc91f706a937b53ce93894b6d3.png",
    },
    kraken: {
      id: "kraken",
      name: "Kraken",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYmcybjoLplsiDJaLziZEI27mSl-oFQtBJg&usqp=CAU",
    },
};
  