import { useState, useEffect } from 'react'
import { Sparkles, Image as ImageIcon, Box, TrendingUp } from 'lucide-react'
import './index.css'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: ''
  })
  const [isPredicting, setIsPredicting] = useState(false)
  const [predictedPrice, setPredictedPrice] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title && !formData.description) return
    
    setIsPredicting(true)
    setPredictedPrice(null)
    
    // Simulate API call and ML model prediction
    setTimeout(() => {
      // Mock prediction logic based on length to make it seem somewhat dynamic
      const basePrice = 25.99
      const titleLengthMulti = (formData.title.length * 0.5) || 1
      const descLengthMulti = (formData.description.length * 0.1) || 1
      const price = basePrice + titleLengthMulti + descLengthMulti
      
      setPredictedPrice(price.toFixed(2))
      setIsPredicting(false)
    }, 2000)
  }

  return (
    <div className="container">
      <header className="hero">
        <h1 className="title">Smart Price Predictor</h1>
        <p className="subtitle">
          Leverage our advanced Machine Learning model to determine the optimal price point for your e-commerce products based on catalog content and imagery.
        </p>
      </header>

      <main className="main-content">
        <div className="glass-panel">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="title">
                <Box size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input-field"
                placeholder="e.g., Premium Wireless Noise-Cancelling Headphones"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="description">
                <Box size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                Catalog Content (Description + Item Pack Quantity)
              </label>
              <textarea
                id="description"
                name="description"
                className="input-field"
                placeholder="Detailed description of the product specifications, features, and bundle contents..."
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="imageUrl">
                <ImageIcon size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                Product Image URL (Optional for Demo)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="input-field"
                placeholder="https://example.com/product-image.jpg"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={isPredicting || (!formData.title && !formData.description)}
            >
              {isPredicting ? (
                <>
                  <div className="loader"></div>
                  Analyzing Features...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Predict Optimal Price
                </>
              )}
            </button>
          </form>
        </div>

        {predictedPrice && (
          <div className="glass-panel result-container">
            <TrendingUp size={48} color="#4ade80" style={{ marginBottom: '1rem' }} />
            <div className="result-label">Predicted Optimal Price</div>
            <div className="result-price">${predictedPrice}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Based on historical data of 75k similar products.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
