/**
 * Script to apply skill extraction and update recommendations.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { recommendations } from '../domains/recommendations/data/recommendations';
import { enhanceRecommendationWithExtractedSkills } from './skillExtraction';

function applySkillExtraction() {
  console.log('🚀 Applying skill extraction to all recommendations...\n');

  // Enhance all recommendations
  const enhancedRecommendations = recommendations.map(rec => {
    const enhanced = enhanceRecommendationWithExtractedSkills(rec);
    const addedCount = enhanced.skills.length - rec.skills.length;

    if (addedCount > 0) {
      console.log(`✨ ${rec.name}: ${rec.skills.length} → ${enhanced.skills.length} (+${addedCount})`);
    }

    return enhanced;
  });

  // Generate the new file content
  const filePath = join(process.cwd(), 'src/data/recommendations.ts');
  const currentContent = readFileSync(filePath, 'utf-8');

  // Find the exports section and replace the recommendations array
  const updatedContent = currentContent.replace(
    /export const recommendations: readonly Recommendation\[\] = \[[\s\S]*?\] as const;/,
    `export const recommendations: readonly Recommendation[] = ${JSON.stringify(enhancedRecommendations, null, 2)} as const;`
  );

  // Format the output to match TypeScript formatting
  const formattedContent = updatedContent
    .replace(/"skills": \[/g, 'skills: [')
    .replace(/"(\w+)":/g, '$1:')
    .replace(/",/g, '\',')
    .replace(/"/g, '\'')
    .replace(/\\n/g, '\\n')
    .replace(/\\`/g, '`');

  // Write the updated file
  writeFileSync(filePath, formattedContent);

  console.log('\n✅ Successfully updated recommendations.ts');
  console.log(`📊 Total recommendations enhanced: ${enhancedRecommendations.filter(r => {
    const original = recommendations.find(orig => orig.id === r.id);
    return r.skills.length > (original?.skills.length || 0);
  }).length}`);

  const totalSkillsBefore = recommendations.reduce((sum, r) => sum + r.skills.length, 0);
  const totalSkillsAfter = enhancedRecommendations.reduce((sum, r) => sum + r.skills.length, 0);

  console.log(`📈 Total skills: ${totalSkillsBefore} → ${totalSkillsAfter} (+${totalSkillsAfter - totalSkillsBefore})`);
}

applySkillExtraction();