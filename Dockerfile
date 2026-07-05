# Controlled environment for building + testing anbani.js.
#
#   docker build -t anbani-js .
#   docker run --rm anbani-js              # build the bundle + run the test suite
#
# Node 20 matches the middle of the CI matrix (18/20/22); the library requires
# Node >= 18.
FROM node:20-slim

WORKDIR /app

# Install dependencies first for layer caching (no lockfile is committed).
COPY package.json ./
RUN npm install

# Copy the source and build the UMD bundle (also proves the TUI is NOT bundled).
COPY . .
RUN npm run build

CMD ["npm", "test"]
