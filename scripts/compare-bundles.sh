#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Bundle Size Comparison Tool${NC}"
echo "================================"

# Create bundle-stats directory if it doesn't exist
mkdir -p bundle-stats

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Save current changes if any
echo -e "${YELLOW}Saving current changes...${NC}"
git stash push -m "temp-bundle-comparison" --include-untracked

# Generate stats for main branch
echo -e "${GREEN}Generating stats for main branch...${NC}"
git checkout main
BRANCH_NAME=main npm run build -- --mode analyze

# Generate stats for current branch
echo -e "${GREEN}Generating stats for $CURRENT_BRANCH branch...${NC}"
git checkout $CURRENT_BRANCH
git stash pop || true
BRANCH_NAME=$CURRENT_BRANCH npm run build -- --mode analyze

# Create comparison HTML
echo -e "${BLUE}Creating comparison view...${NC}"
cat > bundle-stats/compare.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Bundle Stats Comparison</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a1a;
        }
        .header {
            background: #2a2a2a;
            color: white;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        h1 {
            margin: 0;
            font-size: 24px;
        }
        .controls {
            margin-top: 15px;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.3s;
        }
        button:hover {
            background: #45a049;
        }
        button.active {
            background: #2196F3;
        }
        .container {
            display: flex;
            height: calc(100vh - 100px);
        }
        .frame-container {
            flex: 1;
            position: relative;
            border-right: 2px solid #333;
        }
        .frame-container:last-child {
            border-right: none;
        }
        .frame-label {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 10;
            font-size: 14px;
            font-weight: bold;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        .single-view {
            display: none;
        }
        .single-view.active {
            display: block;
            width: 100%;
        }
        .split-view {
            display: flex;
        }
        .stats-info {
            color: #aaa;
            font-size: 12px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Bundle Size Comparison</h1>
        <div class="controls">
            <button onclick="showSplitView()" id="splitBtn" class="active">Split View</button>
            <button onclick="showMainOnly()" id="mainBtn">Main Branch Only</button>
            <button onclick="showCurrentOnly()" id="currentBtn">Current Branch Only</button>
        </div>
        <div class="stats-info">
            Tip: Hover over sections to see detailed size information
        </div>
    </div>
    <div class="container" id="container">
        <div class="frame-container split-view" id="mainFrame">
            <div class="frame-label">Main Branch</div>
            <iframe src="stats-main.html"></iframe>
        </div>
        <div class="frame-container split-view" id="currentFrame">
            <div class="frame-label">Current Branch</div>
            <iframe src="stats-current.html"></iframe>
        </div>
    </div>

    <script>
        function showSplitView() {
            document.getElementById('mainFrame').className = 'frame-container split-view';
            document.getElementById('currentFrame').className = 'frame-container split-view';
            document.getElementById('container').className = 'container split-view';
            setActiveButton('splitBtn');
        }

        function showMainOnly() {
            document.getElementById('mainFrame').className = 'frame-container single-view active';
            document.getElementById('currentFrame').className = 'frame-container single-view';
            document.getElementById('container').className = 'container';
            setActiveButton('mainBtn');
        }

        function showCurrentOnly() {
            document.getElementById('mainFrame').className = 'frame-container single-view';
            document.getElementById('currentFrame').className = 'frame-container single-view active';
            document.getElementById('container').className = 'container';
            setActiveButton('currentBtn');
        }

        function setActiveButton(btnId) {
            document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            document.getElementById(btnId).classList.add('active');
        }

        // Replace "current" with actual branch name if available
        const urlParams = new URLSearchParams(window.location.search);
        const currentBranch = urlParams.get('branch') || 'current';
        if (currentBranch !== 'current') {
            document.querySelector('#currentFrame .frame-label').textContent = currentBranch + ' Branch';
        }
    </script>
</body>
</html>
EOF

echo -e "${GREEN}✓ Bundle comparison ready!${NC}"
echo ""
echo "View comparison at: bundle-stats/compare.html"
echo "Main branch stats: bundle-stats/stats-main.html"
echo "Current branch stats: bundle-stats/stats-$CURRENT_BRANCH.html"
echo ""
echo -e "${BLUE}Opening comparison view...${NC}"

# Open the comparison view
if [[ "$OSTYPE" == "darwin"* ]]; then
    open bundle-stats/compare.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open bundle-stats/compare.html
else
    echo "Please open bundle-stats/compare.html in your browser"
fi