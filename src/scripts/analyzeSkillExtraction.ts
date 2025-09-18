/**
 * Script to analyze and preview skill extraction opportunities
 */

import { recommendations } from '../data/recommendations';
import {
  analyzeSkillExtractionOpportunities,
  extractSkillsFromContent,
} from './skillExtraction';

function runAnalysis() {
  console.log('🔍 Analyzing skill extraction opportunities...\n');

  const analysis = analyzeSkillExtractionOpportunities([...recommendations]);

  console.log('📊 SUMMARY:');
  console.log(`Total recommendations: ${analysis.summary.totalRecommendations}`);
  console.log(`Recommendations with extractions: ${analysis.summary.recommendationsWithExtractions}`);
  console.log(`Total extracted skills: ${analysis.summary.totalExtractedSkills}`);
  console.log(`Average skills per recommendation: ${analysis.summary.averageSkillsPerRecommendation.toFixed(1)}\n`);

  console.log('📋 DETAILED RESULTS:\n');

  analysis.results.forEach(result => {
    if (result.extractedSkills.length > 0) {
      console.log(`👤 ${result.name} (ID: ${result.id})`);
      console.log(`   Current skills (${result.currentSkills.length}): ${result.currentSkills.join(', ')}`);
      console.log(`   ✨ Extracted skills (${result.extractedSkills.length}): ${result.extractedSkills.join(', ')}`);
      console.log(`   📈 Total enhanced: ${result.enhancedTotal} skills\n`);
    }
  });

  // Show specific examples
  console.log('🎯 SPECIFIC EXAMPLES:\n');

  // Noelle's example (from the highlighted content)
  const noelle = recommendations.find(r => r.name === 'Noelle Burton');
  if (noelle) {
    const extracted = extractSkillsFromContent(noelle);
    console.log('📌 Noelle Burton (highlighted example):');
    console.log(`   Current: ${noelle.skills.join(', ')}`);
    console.log(`   Extracted: ${extracted.join(', ')}`);
    console.log(`   Enhanced total: ${noelle.skills.length + extracted.length} skills\n`);
  }

  // Show a few more examples
  const topExtractions = analysis.results
    .filter(r => r.extractedSkills.length >= 3)
    .slice(0, 3);

  topExtractions.forEach(result => {
    console.log(`📌 ${result.name}:`);
    console.log(`   Current: ${result.currentSkills.join(', ')}`);
    console.log(`   Extracted: ${result.extractedSkills.join(', ')}`);
    console.log(`   Enhanced total: ${result.enhancedTotal} skills\n`);
  });
}

// Run the analysis
runAnalysis();