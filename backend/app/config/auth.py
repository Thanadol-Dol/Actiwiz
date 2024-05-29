from msal import ConfidentialClientApplication
import os
from fastapi.security.api_key import APIKeyHeader

auth_app = ConfidentialClientApplication(
    client_id=os.environ.get('AZURE_AD_CLIENT_ID'),
    client_credential=os.environ.get('AZURE_AD_CREDENTIAL'),
    authority=os.environ.get('AZURE_AD_AUTHORITY'),
)

api_scopes = []
api_scopes.append(os.environ.get('AZURE_AD_SCOPES'))
graph_scopes = ["User.Read","User.ReadBasic.All"]
token_scp = os.environ.get('AZURE_AD_ACCESS_TOKEN_SCP')

api_token_header = APIKeyHeader(name="Authorization", scheme_name='API Token')
graph_token_header = APIKeyHeader(name="Graph", scheme_name='Graph Token')
refresh_token_header = APIKeyHeader(name="Refresh", scheme_name='Refresh Token')
notification_token_header = APIKeyHeader(name="Notification", scheme_name='Notification Token')