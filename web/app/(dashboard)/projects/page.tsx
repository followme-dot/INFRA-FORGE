'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FolderPlus,
  Building2,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  company: string
  status: 'active' | 'development' | 'planning'
  contracts: number
  bots: number
  created: string
}

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const projectName = searchParams.get('name')

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'INFRA VAULT',
      description: 'Decentralized Asset Management Platform',
      company: 'INFRA Group',
      status: 'active',
      contracts: 5,
      bots: 3,
      created: '2024-01-10'
    },
    {
      id: '2',
      name: 'NARDIUM',
      description: 'DApp Ecosystem Platform (DEX, NFT, Governance)',
      company: 'Nardiha Holdings',
      status: 'active',
      contracts: 8,
      bots: 4,
      created: '2024-01-15'
    },
    {
      id: '3',
      name: 'INFRABANK Digital',
      description: 'Digital Banking Solutions with Blockchain',
      company: 'INFRA Group',
      status: 'development',
      contracts: 2,
      bots: 1,
      created: '2024-02-01'
    },
    {
      id: '4',
      name: 'Nardiha Genesis Realms',
      description: 'Metaverse & Gaming Platform',
      company: 'Nardiha Holdings',
      status: 'development',
      contracts: 3,
      bots: 0,
      created: '2024-02-10'
    }
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    company: 'INFRA Group'
  })

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.description) {
      alert('Por favor completa todos los campos')
      return
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      company: newProject.company,
      status: 'planning',
      contracts: 0,
      bots: 0,
      created: new Date().toISOString().split('T')[0]
    }

    setProjects([...projects, project])
    setNewProject({ name: '', description: '', company: 'INFRA Group' })
    setShowCreateModal(false)
  }

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400'
      case 'development':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'planning':
        return 'bg-blue-500/20 text-blue-400'
    }
  }

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} />
      case 'development':
        return <Clock size={16} />
      case 'planning':
        return <AlertCircle size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Building2 className="text-cyan-500" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {projectName || 'Gestión de Proyectos'}
            </span>
          </h1>
          <p className="text-gray-400">
            Administra proyectos para INFRA Group, Nardiha Holdings y empresas del ecosistema
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Proyecto
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Total Proyectos</p>
          <p className="text-3xl font-bold text-white">{projects.length}</p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Activos</p>
          <p className="text-3xl font-bold text-green-400">
            {projects.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Contratos Totales</p>
          <p className="text-3xl font-bold text-cyan-400">
            {projects.reduce((sum, p) => sum + p.contracts, 0)}
          </p>
        </div>
        <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-sm text-gray-400 mb-2">Bots Totales</p>
          <p className="text-3xl font-bold text-purple-400">
            {projects.reduce((sum, p) => sum + p.bots, 0)}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-cyan-500/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{project.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/contracts?project=${project.id}`)}
                  className="p-2 bg-gray-700/50 hover:bg-cyan-500/20 rounded-lg transition-colors"
                >
                  <Edit size={16} className="text-gray-400 hover:text-cyan-400" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 bg-gray-700/50 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4">{project.description}</p>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-xs text-gray-500 mb-1">Contratos</p>
                <p className="text-lg font-bold text-cyan-400">{project.contracts}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Bots</p>
                <p className="text-lg font-bold text-purple-400">{project.bots}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
              <button
                onClick={() => router.push(`/contracts?project=${project.id}`)}
                className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm font-semibold"
              >
                Ver Contratos
              </button>
              <button
                onClick={() => router.push(`/bots?project=${project.id}`)}
                className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-semibold"
              >
                Ver Bots
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full mx-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <FolderPlus className="text-cyan-500" size={32} />
              <h2 className="text-2xl font-bold">Crear Nuevo Proyecto</h2>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white placeholder:text-gray-400"
                  placeholder="Ej: INFRA Token Ecosystem"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  placeholder="Describe brevemente el proyecto..."
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <select
                  value={newProject.company}
                  onChange={(e) => setNewProject({ ...newProject, company: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white"
                >
                  <option value="INFRA Group">INFRA Group</option>
                  <option value="Nardiha Holdings">Nardiha Holdings</option>
                  <option value="INFRABANK">INFRABANK</option>
                  <option value="INFRA Dev·Tech">INFRA Dev·Tech</option>
                  <option value="Nardiha Genesis">Nardiha Genesis</option>
                  <option value="Cliente Externo">Cliente Externo</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProject}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Crear Proyecto
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
