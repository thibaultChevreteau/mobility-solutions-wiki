import { newSolution } from "@/lib/actions"

export default async function Page() {
  return (
    <form action={newSolution}>
      <input
        name="name"
        type="text"
        className="border"
        placeholder="Enter name"
      />
      <input
        name="description"
        type="text"
        className="border"
        placeholder="Enter description"
      />
      <input
        name="category"
        type="text"
        className="border"
        placeholder="Enter category"
      />
      <input
        name="imgurl"
        type="text"
        className="border"
        placeholder="Enter image URL"
      />
      <input
        name="imgId"
        type="text"
        className="border"
        placeholder="Enter image ID"
      />
      <input name="latitude" type="number" className="border" placeholder="0" />
      <input
        name="longitude"
        type="number"
        className="border"
        placeholder="0"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
