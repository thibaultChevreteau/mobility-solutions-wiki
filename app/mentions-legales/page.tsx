import Image from "next/image"

export default function Page() {
  return (
    <div className="p-4">
      <p className="text-lg font-semibold">Mentions légales</p>
      <p className="text-gray-500">Dernière mise à jour : 10 septembre 2024</p>
      <p className="text-gray-500">
        https://mobility-solutions-wiki.vercel.app/
      </p>

      <p className="text-gray-500">
        Cette page contient les informations légales requises pour le site
        accessible à l&apos;adresse https://mobility-solutions-wiki.vercel.app/,
        désigné ici par &quot;Site&quot;, conformément aux obligations définies
        par la Loi n° 2004-575 du 21 juin 2004 pour la confiance dans
        l&apos;économie numérique (LCEN).
      </p>

      <p className="text-gray-500">
        Le Site est soumis à la législation française.
      </p>

      <p className="text-lg font-semibold">
        Identification de l&apos;entreprise
      </p>

      <p className="text-gray-500">THIBAULT CHEVRETEAU EI</p>
      <p className="text-gray-500">
        5 quartier Piétat, 65400 Saint-Savin, France
      </p>
      <p className="text-gray-500">Entreprise individuelle</p>

      <p className="text-gray-500">SIRET 930 329 933 00012</p>

      <p className="text-lg font-semibold">
        Éditeur et Directeur de publication du Site
      </p>

      <p className="text-gray-500">THIBAULT CHEVRETEAU EI</p>
      <p className="text-gray-500">
        5 quartier Piétat, 65400 Saint-Savin, France
      </p>
      <p className="text-gray-500">thibault.chevreteau@gmail.com</p>

      <p className="text-lg font-semibold">Hébergeur du Site</p>

      <p className="text-gray-500">Vercel Inc.</p>
      <p className="text-gray-500">
        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
      </p>
      <p className="text-gray-500">https://vercel.com</p>

      <p className="text-lg font-semibold">Politique de confidentialité</p>

      <p className="text-gray-500">
        Aucune données à caractère personnel ne sont collectées sur le Site.
      </p>

      <p className="text-lg font-semibold">Propriété intellectuelle</p>

      <p>
        <a
          property="dct:title"
          rel="cc:attributionURL"
          href="https://mobility-solutions-wiki.vercel.app/"
        >
          Pyrénées Mobilité
        </a>{" "}
        by <span property="cc:attributionName">Thibault Chevreteau</span> is
        licensed under
        <Image src="cc.svg" alt="" width={22} height={22} />
        <Image src="by.svg" alt="" width={22} height={22} />
        <Image src="nc.svg" alt="" width={22} height={22} />
      </p>

      <p className="text-gray-500">
        Les images utilisées sur le Site sont la propriété de leurs créateurs
        respectifs.
      </p>

      <p className="text-lg font-semibold">Limites de responsabilités</p>

      <p className="text-gray-500">
        Le contenu du Site internet a été produit de façon indépendante et
        n&apos;engage pas les entreprises ou marques citées.
      </p>
    </div>
  )
}
