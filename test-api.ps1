# Intern Tracker API Test Suite
# This script tests all API endpoints

$ErrorActionPreference = "Stop"
$baseUrl = "http://localhost:5000/api"
$testResults = @()

function Test-Endpoint {
    param($name, $scriptBlock)
    Write-Host "`n=== $name ===" -ForegroundColor Cyan
    try {
        & $scriptBlock
        $testResults += @{Name = $name; Status = "PASS" }
        Write-Host "✅ PASS" -ForegroundColor Green
    }
    catch {
        $testResults += @{Name = $name; Status = "FAIL"; Error = $_.Exception.Message }
        Write-Host "❌ FAIL: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# TEST 1: Health Check
Test-Endpoint "Health Endpoint" {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    if ($response.status -ne "ok") { throw "Health check failed" }
    Write-Host "Status: $($response.status), Message: $($response.message)"
}

# TEST 2: GET All Interns (Empty)
Test-Endpoint "GET All Interns (Initial)" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns" -Method GET
    Write-Host "Total interns: $($response.pagination.total)"
    Write-Host "Current page: $($response.pagination.page)"
}

# TEST 3: Create Intern #1
Test-Endpoint "POST Create Intern (Frontend)" {
    $body = @{
        name   = "Sarah Johnson"
        email  = "sarah.j@techcorp.com"
        role   = "Frontend"
        status = "Applied"
        score  = 78
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/interns" -Method POST -Body $body -ContentType "application/json"
    $script:internId1 = $response._id
    Write-Host "Created: $($response.name) (ID: $($response._id))"
}

# TEST 4: Create Intern #2
Test-Endpoint "POST Create Intern (Backend)" {
    $body = @{
        name   = "Michael Chen"
        email  = "michael.chen@devs.com"
        role   = "Backend"
        status = "Interviewing"
        score  = 92
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/interns" -Method POST -Body $body -ContentType "application/json"
    $script:internId2 = $response._id
    Write-Host "Created: $($response.name) (ID: $($response._id))"
}

# TEST 5: Create Intern #3
Test-Endpoint "POST Create Intern (Fullstack)" {
    $body = @{
        name   = "Emily Rodriguez"
        email  = "emily.r@startup.io"
        role   = "Fullstack"
        status = "Hired"
        score  = 95
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/interns" -Method POST -Body $body -ContentType "application/json"
    $script:internId3 = $response._id
    Write-Host "Created: $($response.name) (ID: $($response._id))"
}

# TEST 6: GET All Interns (Should have 4 - including John Doe from earlier)
Test-Endpoint "GET All Interns (After Creation)" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns" -Method GET
    Write-Host "Total interns: $($response.pagination.total)"
    foreach ($intern in $response.data) {
        Write-Host "  - $($intern.name) | $($intern.role) | $($intern.status) | Score: $($intern.score)"
    }
}

# TEST 7: GET Single Intern by ID
Test-Endpoint "GET Single Intern by ID" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns/$script:internId2" -Method GET
    if ($response.name -ne "Michael Chen") { throw "Wrong intern returned" }
    Write-Host "Retrieved: $($response.name) - $($response.email)"
}

# TEST 8: Search by Name
Test-Endpoint "Search by Name (query: emily)" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns?q=emily" -Method GET
    Write-Host "Found $($response.pagination.total) result(s)"
    foreach ($intern in $response.data) {
        Write-Host "  - $($intern.name)"
    }
}

# TEST 9: Filter by Role
Test-Endpoint "Filter by Role (Backend)" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns?role=Backend" -Method GET
    Write-Host "Found $($response.pagination.total) Backend intern(s)"
    foreach ($intern in $response.data) {
        Write-Host "  - $($intern.name) | $($intern.role)"
    }
}

# TEST 10: Filter by Status
Test-Endpoint "Filter by Status (Hired)" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns?status=Hired" -Method GET
    Write-Host "Found $($response.pagination.total) Hired intern(s)"
    foreach ($intern in $response.data) {
        Write-Host "  - $($intern.name) | $($intern.status)"
    }
}

# TEST 11: Combined Search and Filter
Test-Endpoint "Combined: Search + Filter" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns?q=chen&role=Backend" -Method GET
    Write-Host "Found $($response.pagination.total) result(s) matching 'chen' and role 'Backend'"
}

# TEST 12: UPDATE Intern
Test-Endpoint "PATCH Update Intern" {
    $body = @{
        status = "Hired"
        score  = 98
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/interns/$script:internId1" -Method PATCH -Body $body -ContentType "application/json"
    Write-Host "Updated $($response.name): Status=$($response.status), Score=$($response.score)"
}

# TEST 13: Pagination
Test-Endpoint "Pagination (limit=2, page=1)" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns?limit=2&page=1" -Method GET
    Write-Host "Page 1 of $($response.pagination.totalPages) (showing $($response.data.Count) items)"
    Write-Host "Has next page: $($response.pagination.hasNextPage)"
}

# TEST 14: Validation Error - Invalid Email
Test-Endpoint "Validation Error (Invalid Email)" {
    try {
        $body = @{
            name   = "Test User"
            email  = "invalid-email"
            role   = "Frontend"
            status = "Applied"
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "$baseUrl/interns" -Method POST -Body $body -ContentType "application/json"
        throw "Should have failed validation"
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "Correctly rejected invalid email"
        }
        else {
            throw
        }
    }
}

# TEST 15: Validation Error - Name Too Short
Test-Endpoint "Validation Error (Name Too Short)" {
    try {
        $body = @{
            name   = "A"
            email  = "test@example.com"
            role   = "Frontend"
            status = "Applied"
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "$baseUrl/interns" -Method POST -Body $body -ContentType "application/json"
        throw "Should have failed validation"
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "Correctly rejected name too short"
        }
        else {
            throw
        }
    }
}

# TEST 16: Duplicate Email Error
Test-Endpoint "Duplicate Email Error" {
    try {
        $body = @{
            name   = "Another Person"
            email  = "sarah.j@techcorp.com"
            role   = "Frontend"
            status = "Applied"
        } | ConvertTo-Json
        
        Invoke-RestMethod -Uri "$baseUrl/interns" -Method POST -Body $body -ContentType "application/json"
        throw "Should have failed due to duplicate email"
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 409) {
            Write-Host "Correctly rejected duplicate email"
        }
        else {
            throw
        }
    }
}

# TEST 17: Invalid ObjectId Error
Test-Endpoint "Invalid ObjectId Error" {
    try {
        Invoke-RestMethod -Uri "$baseUrl/interns/invalid-id-123" -Method GET
        throw "Should have failed with invalid ID"
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "Correctly rejected invalid ObjectId"
        }
        else {
            throw
        }
    }
}

# TEST 18: DELETE Intern
Test-Endpoint "DELETE Intern" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns/$script:internId3" -Method DELETE
    Write-Host "Deleted intern: $($response.message)"
}

# TEST 19: Verify Deletion
Test-Endpoint "Verify Deletion (GET deleted intern)" {
    try {
        Invoke-RestMethod -Uri "$baseUrl/interns/$script:internId3" -Method GET
        throw "Intern should have been deleted"
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 404) {
            Write-Host "Correctly returned 404 for deleted intern"
        }
        else {
            throw
        }
    }
}

# TEST 20: Final Count
Test-Endpoint "Final Intern Count" {
    $response = Invoke-RestMethod -Uri "$baseUrl/interns" -Method GET
    Write-Host "Total interns remaining: $($response.pagination.total)"
}

# Summary
Write-Host "`n`n========================================" -ForegroundColor Yellow
Write-Host "         TEST SUMMARY" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

$passed = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failed = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
$total = $testResults.Count

Write-Host "`nTotal Tests: $total" -ForegroundColor Cyan
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })

if ($failed -gt 0) {
    Write-Host "`nFailed Tests:" -ForegroundColor Red
    $testResults | Where-Object { $_.Status -eq "FAIL" } | ForEach-Object {
        Write-Host "  ❌ $($_.Name): $($_.Error)" -ForegroundColor Red
    }
}

Write-Host "`n✨ Testing Complete!" -ForegroundColor Green
