# backend/Dockerfile
FROM ruby:3.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Ensure npm is installed
RUN apt-get install -y npm

# Set up working directory
WORKDIR /app

# Install Rails dependencies
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

# Install Node.js dependencies using npm
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Copy the main application
COPY . /app

# Start the server
CMD rm -f /app/tmp/pids/server.pid && rails s -b 0.0.0.0 -p 3001