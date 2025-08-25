#!/usr/bin/env python3
"""
Zaddy Platform Backend API Testing Suite
Tests all backend endpoints for the Zaddy Platform
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://skillzaddy.preview.emergentagent.com/api"

class ZaddyAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.test_results = []
        self.auth_token = None
        
    def log_test(self, test_name, success, details="", response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_root_api(self):
        """Test GET /api - Root API health check"""
        try:
            response = self.session.get(f"{self.base_url}")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Zaddy Platform API is running!' and data.get('status') == 'success':
                    self.log_test("Root API Health Check", True, "API is running successfully")
                    return True
                else:
                    self.log_test("Root API Health Check", False, "Unexpected response format", data)
                    return False
            else:
                self.log_test("Root API Health Check", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Root API Health Check", False, f"Exception: {str(e)}")
            return False

    def test_get_packages(self):
        """Test GET /api/packages - Get all packages"""
        try:
            response = self.session.get(f"{self.base_url}/packages")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'packages' in data:
                    packages = data['packages']
                    if len(packages) == 3:  # Alpha, Beta, Gamma
                        package_ids = [p['id'] for p in packages]
                        expected_ids = ['alpha', 'beta', 'gamma']
                        if all(pid in package_ids for pid in expected_ids):
                            self.log_test("Get All Packages", True, f"Found {len(packages)} packages: {package_ids}")
                            return True
                        else:
                            self.log_test("Get All Packages", False, f"Missing expected packages. Found: {package_ids}")
                            return False
                    else:
                        self.log_test("Get All Packages", False, f"Expected 3 packages, got {len(packages)}")
                        return False
                else:
                    self.log_test("Get All Packages", False, "Invalid response format", data)
                    return False
            else:
                self.log_test("Get All Packages", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get All Packages", False, f"Exception: {str(e)}")
            return False

    def test_get_specific_package(self):
        """Test GET /api/packages/alpha - Get specific package details"""
        try:
            response = self.session.get(f"{self.base_url}/packages/alpha")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'package' in data:
                    package = data['package']
                    if package.get('id') == 'alpha' and package.get('name') == 'Alpha':
                        required_fields = ['title', 'price', 'originalPrice', 'status', 'features']
                        if all(field in package for field in required_fields):
                            self.log_test("Get Specific Package (Alpha)", True, "Alpha package retrieved with all required fields")
                            return True
                        else:
                            missing_fields = [f for f in required_fields if f not in package]
                            self.log_test("Get Specific Package (Alpha)", False, f"Missing fields: {missing_fields}")
                            return False
                    else:
                        self.log_test("Get Specific Package (Alpha)", False, "Package ID or name mismatch", package)
                        return False
                else:
                    self.log_test("Get Specific Package (Alpha)", False, "Invalid response format", data)
                    return False
            else:
                self.log_test("Get Specific Package (Alpha)", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Specific Package (Alpha)", False, f"Exception: {str(e)}")
            return False

    def test_get_nonexistent_package(self):
        """Test GET /api/packages/nonexistent - Should return 404"""
        try:
            response = self.session.get(f"{self.base_url}/packages/nonexistent")
            
            if response.status_code == 404:
                data = response.json()
                if 'error' in data:
                    self.log_test("Get Nonexistent Package (404 Test)", True, "Correctly returned 404 for nonexistent package")
                    return True
                else:
                    self.log_test("Get Nonexistent Package (404 Test)", False, "404 status but no error message", data)
                    return False
            else:
                self.log_test("Get Nonexistent Package (404 Test)", False, f"Expected 404, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Nonexistent Package (404 Test)", False, f"Exception: {str(e)}")
            return False

    def test_mock_login(self):
        """Test POST /api/auth/login - Mock login functionality"""
        try:
            login_data = {
                "email": "test@example.com",
                "password": "testpassword123"
            }
            
            response = self.session.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'user' in data and 'token' in data:
                    user = data['user']
                    token = data['token']
                    if user.get('email') == login_data['email'] and token.startswith('mock-jwt-token-'):
                        self.auth_token = token  # Store for later tests
                        self.log_test("Mock Login", True, f"Login successful for {user['email']}")
                        return True
                    else:
                        self.log_test("Mock Login", False, "Invalid user data or token format", data)
                        return False
                else:
                    self.log_test("Mock Login", False, "Missing success, user, or token in response", data)
                    return False
            else:
                self.log_test("Mock Login", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Mock Login", False, f"Exception: {str(e)}")
            return False

    def test_invalid_login(self):
        """Test POST /api/auth/login with invalid credentials"""
        try:
            login_data = {
                "email": "invalid@example.com",
                "password": "wrongpassword"
            }
            
            response = self.session.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 401:
                data = response.json()
                if 'error' in data:
                    self.log_test("Invalid Login (401 Test)", True, "Correctly returned 401 for invalid credentials")
                    return True
                else:
                    self.log_test("Invalid Login (401 Test)", False, "401 status but no error message", data)
                    return False
            else:
                self.log_test("Invalid Login (401 Test)", False, f"Expected 401, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Invalid Login (401 Test)", False, f"Exception: {str(e)}")
            return False

    def test_mock_registration(self):
        """Test POST /api/auth/register - Mock registration"""
        try:
            register_data = {
                "email": "newuser@example.com",
                "name": "John Smith",
                "phone": "+1234567890",
                "password": "newpassword123"
            }
            
            response = self.session.post(f"{self.base_url}/auth/register", json=register_data)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'user' in data:
                    user = data['user']
                    if (user.get('email') == register_data['email'] and 
                        user.get('name') == register_data['name'] and
                        'id' in user):
                        self.log_test("Mock Registration", True, f"Registration successful for {user['email']}")
                        return True
                    else:
                        self.log_test("Mock Registration", False, "User data mismatch", data)
                        return False
                else:
                    self.log_test("Mock Registration", False, "Missing success or user in response", data)
                    return False
            else:
                self.log_test("Mock Registration", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Mock Registration", False, f"Exception: {str(e)}")
            return False

    def test_mock_purchase(self):
        """Test POST /api/purchase - Mock purchase flow"""
        try:
            purchase_data = {
                "packageId": "alpha",
                "paymentMethod": "credit_card"
            }
            
            response = self.session.post(f"{self.base_url}/purchase", json=purchase_data)
            
            if response.status_code == 200:
                data = response.json()
                if (data.get('success') and 'orderId' in data and 
                    'package' in data and data['orderId'].startswith('order_')):
                    package = data['package']
                    if package.get('id') == 'alpha':
                        self.log_test("Mock Purchase", True, f"Purchase successful with order ID: {data['orderId']}")
                        return True
                    else:
                        self.log_test("Mock Purchase", False, "Package ID mismatch in response", data)
                        return False
                else:
                    self.log_test("Mock Purchase", False, "Missing required fields in response", data)
                    return False
            else:
                self.log_test("Mock Purchase", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Mock Purchase", False, f"Exception: {str(e)}")
            return False

    def test_purchase_invalid_package(self):
        """Test POST /api/purchase with invalid package"""
        try:
            purchase_data = {
                "packageId": "invalid_package",
                "paymentMethod": "credit_card"
            }
            
            response = self.session.post(f"{self.base_url}/purchase", json=purchase_data)
            
            if response.status_code == 404:
                data = response.json()
                if 'error' in data:
                    self.log_test("Purchase Invalid Package (404 Test)", True, "Correctly returned 404 for invalid package")
                    return True
                else:
                    self.log_test("Purchase Invalid Package (404 Test)", False, "404 status but no error message", data)
                    return False
            else:
                self.log_test("Purchase Invalid Package (404 Test)", False, f"Expected 404, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Purchase Invalid Package (404 Test)", False, f"Exception: {str(e)}")
            return False

    def test_get_profile_without_auth(self):
        """Test GET /api/profile without authorization header"""
        try:
            response = self.session.get(f"{self.base_url}/profile")
            
            if response.status_code == 401:
                data = response.json()
                if 'error' in data:
                    self.log_test("Get Profile Without Auth (401 Test)", True, "Correctly returned 401 for unauthorized access")
                    return True
                else:
                    self.log_test("Get Profile Without Auth (401 Test)", False, "401 status but no error message", data)
                    return False
            else:
                self.log_test("Get Profile Without Auth (401 Test)", False, f"Expected 401, got {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Profile Without Auth (401 Test)", False, f"Exception: {str(e)}")
            return False

    def test_get_profile_with_auth(self):
        """Test GET /api/profile with authorization header"""
        try:
            headers = {"authorization": "Bearer mock-token"}
            response = self.session.get(f"{self.base_url}/profile", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'user' in data:
                    user = data['user']
                    if 'id' in user and 'email' in user and 'activePackages' in user:
                        self.log_test("Get Profile With Auth", True, f"Profile retrieved for user: {user.get('email')}")
                        return True
                    else:
                        self.log_test("Get Profile With Auth", False, "Missing required user fields", data)
                        return False
                else:
                    self.log_test("Get Profile With Auth", False, "Missing success or user in response", data)
                    return False
            else:
                self.log_test("Get Profile With Auth", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Profile With Auth", False, f"Exception: {str(e)}")
            return False

    def test_get_progress(self):
        """Test GET /api/progress - Get user progress data"""
        try:
            response = self.session.get(f"{self.base_url}/progress")
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'progress' in data:
                    progress = data['progress']
                    if isinstance(progress, dict):
                        self.log_test("Get Progress", True, f"Progress data retrieved successfully")
                        return True
                    else:
                        self.log_test("Get Progress", False, "Progress data is not a dictionary", data)
                        return False
                else:
                    self.log_test("Get Progress", False, "Missing success or progress in response", data)
                    return False
            else:
                self.log_test("Get Progress", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Get Progress", False, f"Exception: {str(e)}")
            return False

    def test_update_progress(self):
        """Test POST /api/progress/update - Update lesson progress"""
        try:
            progress_data = {
                "lessonId": "lesson1",
                "watchedDuration": 600,
                "completed": True
            }
            
            response = self.session.post(f"{self.base_url}/progress/update", json=progress_data)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'message' in data:
                    self.log_test("Update Progress", True, "Progress updated successfully")
                    return True
                else:
                    self.log_test("Update Progress", False, "Missing success or message in response", data)
                    return False
            else:
                self.log_test("Update Progress", False, f"Status code: {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("Update Progress", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Zaddy Platform Backend API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)
        print()
        
        # Test all endpoints
        tests = [
            self.test_root_api,
            self.test_get_packages,
            self.test_get_specific_package,
            self.test_get_nonexistent_package,
            self.test_mock_login,
            self.test_invalid_login,
            self.test_mock_registration,
            self.test_mock_purchase,
            self.test_purchase_invalid_package,
            self.test_get_profile_without_auth,
            self.test_get_profile_with_auth,
            self.test_get_progress,
            self.test_update_progress
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        print("=" * 60)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print(f"⚠️  {total - passed} tests failed. Check the details above.")
            return False

def main():
    """Main function to run the tests"""
    tester = ZaddyAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()