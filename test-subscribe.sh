#!/bin/bash
echo "=== /api/subscribe Tests ==="

# Test 1: Valid email
echo ""
echo "TEST 1: POST valid email"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST https://clawplex.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test$(date +%s)@example.com"}')
BODY=$(echo "$RESP" | sed '$d')
CODE=$(echo "$RESP" | tail -1 | cut -d: -f2)
echo "Status: $CODE"
echo "Body: $BODY"

# Test 2: Invalid email
echo ""
echo "TEST 2: POST invalid email"
RESP=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST https://clawplex.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email"}')
BODY=$(echo "$RESP" | sed '$d')
CODE=$(echo "$RESP" | tail -1 | cut -d: -f2)
echo "Status: $CODE"
echo "Body: $BODY"

# Test 3: Duplicate email (use a known invalid to test graceful handling)
echo ""
echo "TEST 3: POST duplicate email (same email twice)"
EMAIL="duplicate$(date +%s)@example.com"
RESP1=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST https://clawplex.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\"}")
CODE1=$(echo "$RESP1" | tail -1 | cut -d: -f2)
echo "First POST Status: $CODE1"

RESP2=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST https://clawplex.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\"}")
CODE2=$(echo "$RESP2" | tail -1 | cut -d: -f2)
BODY2=$(echo "$RESP2" | sed '$d')
echo "Second POST Status: $CODE2"
echo "Second POST Body: $BODY2"
