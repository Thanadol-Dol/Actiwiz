from fastapi.security.api_key import APIKeyHeader

api_token_header = APIKeyHeader(name="Authorization", scheme_name='API Token')
graph_token_header = APIKeyHeader(name="Graph", scheme_name='Graph Token')
refresh_token_header = APIKeyHeader(name="Refresh", scheme_name='Refresh Token')
notification_token_header = APIKeyHeader(name="Notification", scheme_name='Notification Token')