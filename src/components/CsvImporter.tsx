import Papa from 'papaparse'
import { useAuth } from '../auth/useAuth'
import { supabase } from '../lib/supabase'

type CsvRow = Record<string, string>

export default function CsvImporter() {
  const { isAdmin } = useAuth()

  if (!isAdmin) return null

  async function handleFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        const data = (results.data as CsvRow[]).filter(
          (row) => row.title?.trim()
        )

        const { error } = await supabase
          .from('questions')
          .upsert(data, {
            onConflict: 'title',
          })

        if (error) {
          console.log(error)
          alert(`Erro ao importar CSV: ${error.message}`)
          return
        }

        alert('CSV importado com sucesso!')
      },
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-4">
        Importar CSV
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
      />
    </div>
  )
}
