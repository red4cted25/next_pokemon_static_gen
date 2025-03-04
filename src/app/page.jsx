import Link from "next/link";

async function getPokemonList() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
  return res.json();
}

export default async function Home() {
  const { results: pokemon } = await getPokemonList();

  return (
    <div>
      <h1 className="font-semibold text-5xl mb-8">Pokemon List</h1>
      <ul className="grid gap-4 grid-cols-6 grid-rows-8">
        {pokemon.map((p, index) => (
          <li key={index}>
            <Link href={`/pokemon/${index + 1}`} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}