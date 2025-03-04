import Image from "next/image";
import Link from "next/link";

async function getPokemonData(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = res.json();
    console.log(data);
    return data;
}

export async function generateStaticParams() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    const data = await res.json();

    return data.results.map((_, index) => ({
        id: (index + 1).toString(),
    }))
}

export default async function PokemonPage({ params }) {
    const pokemon = await getPokemonData(params.id);

    return (
        <div className="flex justify-center flex-col items-center h-full">
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <Image src={pokemon.sprites.front_default} width={150} height={150} alt={pokemon.name} />
            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">Back to Home</Link>
        </div>
    )
}