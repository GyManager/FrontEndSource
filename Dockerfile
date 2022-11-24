FROM node:16-alpine as builder
WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

# Bundle static assets with nginx
FROM nginx as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]