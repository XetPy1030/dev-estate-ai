.PHONY: help prod-up prod-down prod-logs prod-restart redeploy

GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m

help: ## Показать доступные команды
	@echo "$(GREEN)DevEstate AI - Docker Compose команды$(NC)"
	@echo ""
	@echo "  prod-up       Поднять prod compose с пересборкой"
	@echo "  prod-down     Остановить prod compose"
	@echo "  prod-logs     Логи prod compose"
	@echo "  prod-restart  Перезапуск prod compose"
	@echo "  redeploy      git pull + пересборка + запуск prod compose"

prod-up: ## Запустить прод-окружение
	@echo "$(GREEN)Запуск devestate-ai (prod)...$(NC)"
	docker compose -f docker-compose.prod.yml up -d --build

prod-down: ## Остановить прод-окружение
	@echo "$(RED)Остановка devestate-ai (prod)...$(NC)"
	docker compose -f docker-compose.prod.yml down

prod-logs: ## Логи прод-окружения
	docker compose -f docker-compose.prod.yml logs -f

prod-restart: ## Перезапуск прод-окружения
	@echo "$(YELLOW)Перезапуск devestate-ai (prod)...$(NC)"
	docker compose -f docker-compose.prod.yml down
	docker compose -f docker-compose.prod.yml up -d --build

redeploy: ## Обновить код и перезапустить прод
	@echo "$(YELLOW)Redeploy: git pull + docker compose up...$(NC)"
	git pull
	docker compose -f docker-compose.prod.yml up -d --build
	@echo "$(GREEN)Redeploy завершен.$(NC)"
