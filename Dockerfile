# 1️⃣ Use the official Node.js image
FROM node:20

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# 3️⃣ Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# 4️⃣ Copy the entire project
COPY . .

# Build the Next.js application
RUN npm run build

# 5️⃣ Expose the port Next.js runs on
EXPOSE 3000

# 6️⃣ Start the Next.js app in development mode
CMD ["npm", "run", "start"]
