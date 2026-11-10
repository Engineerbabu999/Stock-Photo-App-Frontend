import React, { useState } from 'react';
import { createRecipe } from '../services/api';
import { Utensils, Plus, X, Sparkles, ChefHat, Check, Copy, Printer, RefreshCw } from 'lucide-react';

const COMMON_PANTRY = [
  'Fresh Salmon',
  'Garlic Cloves',
  'Asparagus',
  'Parmesan',
  'Olive Oil',
  'Chicken Breast',
  'Avocado',
  'Wild Mushrooms',
  'Cherry Tomatoes',
  'Fresh Basil'
];

const CUISINES = [
  'Italian',
  'Japanese',
  'Mexican',
  'Mediterranean',
  'French',
  'Indian',
  'Thai',
  'Artisan Fusion'
];

const DIETARY_OPTIONS = [
  'None',
  'Gluten-Free',
  'Keto',
  'Vegan',
  'Vegetarian',
  'Dairy-Free',
  'Low-Carb'
];

export default function RecipeStudio() {
  const [ingredients, setIngredients] = useState(['Fresh Salmon', 'Garlic Cloves', 'Asparagus']);
  const [ingredientInput, setIngredientInput] = useState('');
  const [cuisine, setCuisine] = useState('Italian');
  const [dietary, setDietary] = useState('Gluten-Free');
  const [loading, setLoading] = useState(false);
  const [recipeText, setRecipeText] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleAddIngredient = (item) => {
    const val = item || ingredientInput.trim();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (itemToRemove) => {
    setIngredients(ingredients.filter((i) => i !== itemToRemove));
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await createRecipe(ingredients.join(', '), cuisine, dietary);
      setRecipeText(res);
    } catch (err) {
      console.error(err);
      setError(`Recipe generation failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRecipe = () => {
    if (!recipeText) return;
    navigator.clipboard.writeText(recipeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="recipe-studio-layout">
      {/* Configuration Panel */}
      <div className="recipe-config-panel glass-panel">
        <div className="panel-header">
          <div className="icon-badge recipe-badge">
            <ChefHat size={22} />
          </div>
          <div>
            <h2 className="section-title">Culinary Recipe Studio</h2>
            <p className="section-subtitle">
              Engineered prompt stream: <code>/recipe-creator</code>
            </p>
          </div>
        </div>

        {/* Ingredients Tag Input */}
        <div className="form-group">
          <label className="form-label">Key Ingredients</label>
          <div className="tag-input-container">
            <div className="tags-display">
              {ingredients.map((item, idx) => (
                <span key={idx} className="ingredient-tag">
                  <span>{item}</span>
                  <button type="button" onClick={() => handleRemoveIngredient(item)} aria-label={`Remove ${item}`}>
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
            <div className="tag-input-row">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddIngredient();
                  }
                }}
                placeholder="Add ingredient (e.g. Rosemary)..."
                className="text-input"
              />
              <button
                type="button"
                className="btn-add-tag"
                onClick={() => handleAddIngredient()}
                disabled={!ingredientInput.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Quick Pantry Suggestions */}
          <div className="pantry-suggestions">
            <span className="pantry-label">Pantry Quick-Select:</span>
            <div className="pantry-chips-scroll">
              <div className="pantry-chips">
                {COMMON_PANTRY.filter((p) => !ingredients.includes(p)).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="pantry-chip"
                    onClick={() => handleAddIngredient(item)}
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cuisine Selector */}
        <div className="form-group">
          <label className="form-label">Cuisine Tradition</label>
          <div className="cuisine-grid">
            {CUISINES.map((c) => (
              <button
                key={c}
                type="button"
                className={`cuisine-btn ${cuisine === c ? 'active' : ''}`}
                onClick={() => setCuisine(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="form-group">
          <label className="form-label">Dietary Preference</label>
          <div className="dietary-pills">
            {DIETARY_OPTIONS.map((d) => (
              <button
                key={d}
                type="button"
                className={`dietary-pill ${dietary === d ? 'active' : ''}`}
                onClick={() => setDietary(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          className="create-recipe-btn"
          onClick={handleGenerateRecipe}
          disabled={loading || ingredients.length === 0}
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="spin-icon" />
              <span>Synthesizing Culinary Formula...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Formulate Gourmet Recipe</span>
            </>
          )}
        </button>

        {error && <div className="error-banner">{error}</div>}
      </div>

      {/* Recipe Presentation Card */}
      <div className="recipe-display-panel glass-panel">
        {recipeText ? (
          <div className="recipe-card-content printable-area">
            <div className="recipe-card-top">
              <div className="recipe-tags-row">
                <span className="recipe-pill cuisine">{cuisine} Tradition</span>
                <span className="recipe-pill dietary">{dietary}</span>
              </div>
              <div className="recipe-top-actions">
                <button className="icon-action-btn" onClick={handleCopyRecipe} title="Copy Recipe">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <button className="icon-action-btn" onClick={handlePrint} title="Print Recipe">
                  <Printer size={16} />
                </button>
              </div>
            </div>

            <div className="recipe-body">
              <div className="recipe-markdown-body">{recipeText}</div>
            </div>
          </div>
        ) : (
          <div className="recipe-empty-state">
            <div className="empty-icon-circle">
              <Utensils size={36} />
            </div>
            <h3>Culinary Studio Ready</h3>
            <p>
              Select your ingredients, cuisine tradition, and dietary profile, then click <strong>Formulate Gourmet Recipe</strong> to synthesize a master chef creation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
